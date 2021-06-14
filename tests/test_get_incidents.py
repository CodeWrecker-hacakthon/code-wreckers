from flask import json

from api.helpers.responses import (
    invalid_token_message,
    expired_token_message,
    auth_response
)
from .base import (
    user2_header,
    expired_token_header,
    user1_header,
    user1_id,
    admin_header,
)


# GET ALL RED-FLAG RECORDS


def test_get_all_red_flags_without_token(client):
    # test only logged in user get red flags
    response = client.get("api/v2/red-flags")
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data == {"error": auth_response, "status": 401}


def test_get_all_red_flags_with_expired_token(client):
    # test only logged in user get red flags
    response = client.get("api/v2/red-flags", headers=expired_token_header)
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data == {"error": expired_token_message, "status": 401}


def test_get_all_red_flags(client):
    response = client.get("api/v2/red-flags", headers=user1_header)
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"][0]["created_by"] == user1_id

    response = client.get("api/v2/red-flags", headers=user2_header)
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"] == []


def test_get_all_red_flags_by_status(client):
    response = client.get("api/v2/red-flags?status=draft", headers=user1_header)
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"][0]["status"] == 'Draft'

    response = client.get("api/v2/red-flags?status=resolved", headers=user2_header)
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"] == []

    response = client.get("api/v2/red-flags?status=under_investigation", headers=admin_header)
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"] == []

    response = client.get("api/v2/interventions?status=resolved", headers=admin_header)
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"][0]["status"] == 'Resolved'


# GET A SPECIFIC RED-FLAG RECORD


def test_get_a_red_flag(client):
    response = client.get(
        "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb",
        headers=user1_header,
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["status"] == 200
    assert (
            data["data"][0]["title"]
            == "Vestibulum blandit ligula a mollis ullamcorper."
    )


def test_get_a_red_flag_with_id_which_does_not_exist(client):
    response = client.get(
        "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf7bebb",
        headers=user1_header,
    )
    assert response.status_code == 404
    data = json.loads(response.data.decode())
    assert data["status"] == 404


def test_get_a_red_flag_for_another_user(client):
    response = client.get(
        "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb",
        headers=user2_header,
    )
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data["status"] == 401
    assert data["error"] == "You're not Authorized to access this resource"


def test_admin_get_a_red_flag(client):
    response = client.get(
        "api/v2/red-flags/10df0c67-5f2b-4e5d-8b45-7357bbf3bebb",
        headers=admin_header,
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["status"] == 200
    assert (
            data["data"][0]["title"]
            == "Vestibulum blandit ligula a mollis ullamcorper."
    )


# INTERVENTIONS


def test_get_all_interventions_without_token(client):
    # test only logged in user get red flags
    response = client.get("api/v2/interventions")
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data == {"error": auth_response, "status": 401}


def test_get_all_interventions_with_expired_token(client):
    # test only logged in user get red flags
    response = client.get("api/v2/interventions", headers=expired_token_header)
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data == {"error": "Please login in again or sign up an account to access this resource", "status": 401}


def test_get_all_interventions(client):
    response = client.get("api/v2/interventions", headers=user1_header)
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"][0]["created_by"] == user1_id

    response = client.get("api/v2/interventions", headers=user2_header)
    assert response.status_code == 200
    assert isinstance(data["data"], list)


# GET A SPECIFIC INTERVENTION RECORD


def test_get_a_intervention(client):
    response = client.get(
        "api/v2/interventions/79bb7006-272e-4e0c-8253-117305466b4a",
        headers=user1_header,
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["status"] == 200
    assert (
            data["data"][0]["title"] == "leo vel fringilla. Egestas tellus rutru"
    )


def test_get_a_intervention_for_another_user(client):
    response = client.get(
        "api/v2/interventions/79bb7006-272e-4e0c-8253-117305466b4a",
        headers=user2_header,
    )
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data["status"] == 401
    assert data["error"] == "You're not Authorized to access this resource"


def test_admin_get_a_intervention(client):
    response = client.get(
        "api/v2/interventions/79bb7006-272e-4e0c-8253-117305466b4a",
        headers=admin_header,
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["status"] == 200
    assert (
            data["data"][0]["title"] == "leo vel fringilla. Egestas tellus rutru"
    )


def test_get_statistics(client):
    response = client.get(
        "api/v2/statistics",
        headers=admin_header,
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["status"] == 200
    assert (data["data"][0]["statistics"]["total"] == 9)
    assert (data["data"][0]["statistics"]["red-flags"]["total"] == 4)
    assert (data["data"][0]["statistics"]["red-flags"]["draft"] == 2)
    assert (data["data"][0]["statistics"]["red-flags"]["resolved"] == 2)
    assert (data["data"][0]["statistics"]["red-flags"]["rejected"] == 0)
    assert (data["data"][0]["statistics"]["red-flags"]["under_investigations"] == 0)
    assert (data["data"][0]["statistics"]["interventions"]["total"] == 5)
    assert (data["data"][0]["statistics"]["interventions"]["draft"] == 3)
    assert (data["data"][0]["statistics"]["interventions"]["resolved"] == 2)
    assert (data["data"][0]["statistics"]["interventions"]["rejected"] == 0)
    assert (data["data"][0]["statistics"]["interventions"]["under_investigations"] == 0)
