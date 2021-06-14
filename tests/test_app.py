from flask import json

from .base import user1_header


def test_invalid_url(client):
    response = client.delete(
        "api/v2/intervention/79bb7006-272e-4e0c-8253-117305466b6a",
        headers=user1_header,
    )
    assert response.status_code == 404
    data = json.loads(response.data.decode())
    assert data["error"] == "Endpoint for specified URL does not exist"

    response = client.get("api/v3/red-flag/ssd", headers=user1_header)
    assert response.status_code == 404
    data = json.loads(response.data.decode())
    assert data["error"] == "Endpoint for specified URL does not exist"


def test_method_not_allowed(client):
    response = client.delete("/")
    assert response.status_code == 405
    data = json.loads(response.data.decode())
    assert data["error"] == "Method not allowed"


def test_welcome_message(client):
    response = client.get("/")
    assert response.status_code == 200
    data =json.loads(response.data.decode())
    assert data["message"] == "Welcome to iReporter API V2"
    assert data["status"] == 200


def test_user_already_logged_in(client):
    response = client.post(
            "api/v2/auth/secure",
            headers=user1_header,
        )
    assert response.status_code == 200
    data =json.loads(response.data.decode())
    assert data["data"][0]["user"]["firstname"] == "userOne"
    assert data["data"][0]["user"]["lastname"] == "userone"
    assert data["data"][0]["user"]["username"] == "user1"
    assert data["status"] == 200
