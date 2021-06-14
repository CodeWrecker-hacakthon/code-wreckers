import os
from uuid import uuid4

from flask import Blueprint, jsonify, request, send_from_directory
from werkzeug.utils import secure_filename

from api.helpers.auth_token import (
    token_required,
    get_current_identity,
    non_admin,
)

create_incident_bp = Blueprint("new_incident", __name__, url_prefix="/api/v2")
from api.models.incident import Incident
from api.helpers.validation import (
    validate_new_incident,
    parse_incident_type,
    is_valid_uuid,
    allowed_image_files,
    allowed_video_files,
)

incident_obj = Incident()


@create_incident_bp.route("/incidents", methods=["POST"])
@token_required
@non_admin
def new_red_flag():
    if not request.data:
        return (
            jsonify({"error": "Please provide incident Data", "status": 400}),
            400,
        )
    data = request.get_json(force=True)

    new_incident_data = {
        "title": data.get("title"),
        "location": data.get("location"),
        "comment": data.get("comment"),
        "inc_type": data.get("type"),
    }

    not_valid = validate_new_incident(**new_incident_data)
    response = None
    incident_type = new_incident_data.get("inc_type")
    if not_valid:
        response = not_valid
    else:
        new_incident_data["user_id"] = get_current_identity()

        new_db_incident_details = incident_obj.insert_incident(
            **new_incident_data
        )

        response = (
            jsonify(
                {
                    "status": 201,
                    "data": [
                        {
                            incident_type: new_db_incident_details,
                            "success": "Created " + incident_type + " record",
                        }
                    ],
                }
            ),
            201,
        )

    return response


@create_incident_bp.route(
    "/<incidents>/<incident_id>/addImage", methods=["PATCH"]
)
@token_required
@parse_incident_type
@non_admin
@is_valid_uuid
def new_image(incidents, incident_id):
    if "image" in request.files:
        image = request.files.get("image")

        if image and allowed_image_files(image.filename):
            filename = secure_filename(image.filename)

            extension = filename.rsplit(".", 1)[1].lower()

            imageName = str(uuid4()) + "." + str(extension)
            imageName = str(imageName).replace("-", "_")
            image.save(os.path.join('uploads/images/', imageName))
            image_id = incident_obj.insert_images(incident_id, str(imageName))
            return (
                jsonify(
                    {
                        "status": 200,
                        "data": [
                            {
                                "id": image_id,
                                "imageName": imageName,
                                "success": "Image added to "
                                           + incidents[:-1]
                                           + " record",
                            }
                        ],
                    }
                ),
                200,
            )
        else:

            return (
                jsonify(
                    {
                        "status": 400,
                        "error": "Only Image files of type {'png', 'jpeg', 'jpg', 'gif'} are supported",
                    }
                ),
                400,
            )

    else:

        return (
            jsonify({"status": 400, "error": "Please provide an image file"}),
            400,
        )


@create_incident_bp.route('/incidents/images/<imageFileName>')
@token_required
def uploaded_file(imageFileName):
    return send_from_directory('../uploads/images/', imageFileName), 200


@create_incident_bp.route(
    "/<incidents>/<incident_id>/addVideo", methods=["PATCH"]
)
@token_required
@parse_incident_type
@non_admin
@is_valid_uuid
def new_video(incidents, incident_id):
    if "video" in request.files:
        video = request.files.get("video")

        if video and allowed_video_files(video.filename):
            filename = secure_filename(video.filename)

            extension = filename.rsplit(".", 1)[1].lower()

            videoName = str(uuid4()) + "." + str(extension)
            videoName = str(videoName).replace("-", "_")
            video.save(os.path.join('uploads/videos/', videoName))
            video_id = incident_obj.insert_videos(incident_id, str(videoName))
            return (
                jsonify(
                    {
                        "status": 200,
                        "data": [
                            {
                                "id": video_id,
                                "videoName": videoName,
                                "success": "Video added to "
                                           + incidents[:-1]
                                           + " record",
                            }
                        ],
                    }
                ),
                200,
            )
        else:

            return (
                jsonify(
                    {
                        "status": 400,
                        "error": "Only video files of type {'mp4', '3gp', 'mpeg', 'mov'} are supported",
                    }
                ),
                400,
            )

    else:

        return (
            jsonify({"status": 400, "error": "Please provide a video file"}),
            400,
        )


@create_incident_bp.route('/incidents/videos/<videoFileName>')
@token_required
def uploaded__video(videoFileName):
    return send_from_directory('../uploads/videos/', videoFileName), 200
