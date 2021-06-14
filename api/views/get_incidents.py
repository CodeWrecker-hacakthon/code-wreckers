from flask import Blueprint, jsonify, request

from api.helpers.auth_token import token_required
from api.helpers.validation import is_valid_uuid, parse_incident_type
from api.models.incident import Incident

get_inc_bp = Blueprint("get_incidents", __name__, url_prefix="/api/v2")

incident_obj = Incident()


@get_inc_bp.route("/<path:incidents>", methods=["GET"])
@token_required
def get_all_incidents(incidents):
    status = ""
    incident_status = ['resolved', 'rejected', 'under_investigation', 'draft']
    if request.args.get('status') and request.args.get('status') in incident_status:
        status = request.args.get('status')
    results = incident_obj.get_all_incident_records(inc_type=incidents[:-1], status=status)

    return jsonify({"status": 200, "data": results}), 200


@get_inc_bp.route("/<incidents>/<incident_id>", methods=["GET"])
@token_required
@parse_incident_type
@is_valid_uuid
def get_a_red_flag(incidents, incident_id):
    inc_type = incidents[:-1]
    results = incident_obj.get_an_incident_record_(
        inc_type=inc_type, inc_id=incident_id
    )

    response = None
    if results and "error" in results:
        response = (jsonify({"status": 401, "error": results["error"]}), 401)
    elif results:
        response = jsonify({"status": 200, "data": [results]}), 200
    else:

        response = (
            jsonify(
                {
                    "status": 404,
                    "error": inc_type
                             + " record with specified id does not exist",
                }
            ),
            404,
        )

    return response


@get_inc_bp.route("/statistics", methods=["GET"])
@token_required
def get_statistics():
    results = incident_obj.get_incidents_statistics()

    return jsonify({"status": 200, "data": [{"statistics": results}]}), 200

# @get_inc_bp.route("/<path:incidents>/<status>", methods=["GET"])
# @token_required
# def get_all_incidents_by_status(incidents, status):
#     #
#     # results = incident_obj.get_all_incident_records(inc_type=incidents[:-1])
#
#     return jsonify({"status": 200, "data": status}), 200
