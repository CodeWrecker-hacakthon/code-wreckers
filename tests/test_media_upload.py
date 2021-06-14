from flask import json
import os
from .base import user1_header, admin_header
from werkzeug.datastructures import FileStorage


# TEST ref-flags

# Add image to red-flag record
def test_add_an_image_without_image_file(client):
    response = client.patch(
        "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb/addImage",
        headers=user1_header,

    )

    assert response.status_code == 400
    data = json.loads(response.data.decode())
    assert data["status"] == 400
    assert data["error"] == "Please provide an image file"


# Add image to red-flag record
def test_add_an_unsupported_image_type(client):
    with open(os.path.join('./tests/media/backer.txt'), 'rb') as fp:
        file = FileStorage(fp)
        response = client.patch(
            "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb/addImage",
            headers=user1_header,
            data={'image': file}
            , content_type='multipart/form-data'
        )

        assert response.status_code == 400
        data = json.loads(response.data.decode())
        assert data["status"] == 400
        assert data["error"] == "Only Image files of type {'png', 'jpeg', 'jpg', 'gif'} are supported"


# Add image to red-flag record
def test_add_an_image_to_a_red_flag_with_image(client):
    with open(os.path.join('./tests/media/test_image.gif'), 'rb') as fp:
        file = FileStorage(fp)
        response = client.patch(
            "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb/addImage",
            headers=user1_header,
            data={'image': file}
            , content_type='multipart/form-data'
        )

        assert response.status_code == 200
        data = json.loads(response.data.decode())
        assert data["status"] == 200
        assert data["data"][0]["success"] == "Image added to red-flag record"


# Test add image to intervention

def test_add_an_image_without_image_file(client):
    response = client.patch(
        "api/v2/interventions/79cc7006-272e-4e0c-8253-117305466b4a/addImage",
        headers=user1_header,

    )

    assert response.status_code == 400
    data = json.loads(response.data.decode())
    assert data["status"] == 400
    assert data["error"] == "Please provide an image file"


def test_add_an_unsupported_image_type(client):
    with open(os.path.join('./tests/media/backer.txt'), 'rb') as fp:
        file = FileStorage(fp)
        response = client.patch(
            "api/v2/interventions/79cc7006-272e-4e0c-8253-117305466b4a/addImage",
            headers=user1_header,
            data={'image': file}
            , content_type='multipart/form-data'
        )

        assert response.status_code == 400
        data = json.loads(response.data.decode())
        assert data["status"] == 400
        assert data["error"] == "Only Image files of type {'png', 'jpeg', 'jpg', 'gif'} are supported"


def test_add_an_image_to_a_intervention_with_image(client):
    with open(os.path.join('./tests/media/test_image.gif'), 'rb') as fp:
        file = FileStorage(fp)
        response = client.patch(
            "api/v2/interventions/79cc7006-272e-4e0c-8253-117305466b4a/addImage",
            headers=user1_header,
            data={'image': file}
            , content_type='multipart/form-data'
        )

        assert response.status_code == 200
        data = json.loads(response.data.decode())
        assert data["status"] == 200
        assert data["data"][0]["success"] == "Image added to intervention record"


def test_view_image_file(client):
    response = client.get(
        "api/v2/incidents/images/0e993f79_a3c5_45b1_9af3_1bb32f28b9c3.gif",
        headers=user1_header,

    )

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "image/gif"


# TEST ref-flags

# Add video to red-flag record
def test_add_an_video_upload_without_video_file(client):
    response = client.patch(
        "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb/addVideo",
        headers=user1_header,

    )

    assert response.status_code == 400
    data = json.loads(response.data.decode())
    assert data["status"] == 400
    assert data["error"] == "Please provide a video file"


# Add a video to red-flag record
def test_add_an_unsupported_video_type(client):
    with open(os.path.join('./tests/media/backer.txt'), 'rb') as fp:
        file = FileStorage(fp)
        response = client.patch(
            "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb/addVideo",
            headers=user1_header,
            data={'video': file}
            , content_type='multipart/form-data'
        )

        assert response.status_code == 400
        data = json.loads(response.data.decode())
        assert data["status"] == 400
        assert data["error"] == "Only video files of type {'mp4', '3gp', 'mpeg', 'mov'} are supported"


#
#
#
# Add video to red-flag record
def test_add_an_video_to_a_red_flag_with_a_video(client):
    with open(os.path.join('./tests/media/SampleVideo_1280x720_1mb.mp4'), 'rb') as fp:
        file = FileStorage(fp)
        response = client.patch(
            "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb/addVideo",
            headers=user1_header,
            data={'video': file}
            , content_type='multipart/form-data'
        )
        #
        assert response.status_code == 200
        data = json.loads(response.data.decode())
        assert data["status"] == 200
        assert data["data"][0]["success"] == "Video added to red-flag record"


# Test add video to intervention

def test_add_an_video_without_video_file(client):
    response = client.patch(
        "api/v2/interventions/79cc7006-272e-4e0c-8253-117305466b4a/addVideo",
        headers=user1_header,

    )

    assert response.status_code == 400
    data = json.loads(response.data.decode())
    assert data["status"] == 400
    assert data["error"] == "Please provide a video file"


def test_add_an_unsupported_video_type(client):
    with open(os.path.join('./tests/media/test_image.gif'), 'rb') as fp:
        file = FileStorage(fp)
        response = client.patch(
            "api/v2/interventions/79cc7006-272e-4e0c-8253-117305466b4a/addVideo",
            headers=user1_header,
            data={'video': file}
            , content_type='multipart/form-data'
        )

        assert response.status_code == 400
        data = json.loads(response.data.decode())
        assert data["status"] == 400
        assert data["error"] == "Only video files of type {'mp4', '3gp', 'mpeg', 'mov'} are supported"


def test_add_an_video_to_a_intervention(client):
    with open(os.path.join('./tests/media/SampleVideo_1280x720_1mb.mp4'), 'rb') as fp:
        file = FileStorage(fp)
        response = client.patch(
            "api/v2/interventions/79cc7006-272e-4e0c-8253-117305466b4a/addVideo",
            headers=user1_header,
            data={'video': file}
            , content_type='multipart/form-data'
        )

        assert response.status_code == 200
        data = json.loads(response.data.decode())
        assert data["status"] == 200
        assert data["data"][0]["success"] == "Video added to intervention record"


def test_view_video_file(client):
    response = client.get(
        # "api/v2/incidents/images/0c7c5c27_7706_4f36_b50a_6cda1387756e.mp4",
        "api/v2/incidents/images/0e993f79_a3c5_45b1_9af3_1bb32f28b9c3.gif",
        headers=user1_header,

    )

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "image/gif"


def test_view_video_file(client):
    response = client.get(
        "api/v2/incidents/videos/2d63469b_0953_4b1f_9cb8_864147c48c2b.mp4",
        headers=user1_header,

    )

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "video/mp4"
