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


def test_get_users_without_token(client):
    # test only logged in user get red flags
    response = client.get("api/v2/users")
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data == {"error": auth_response, "status": 401}


def test_get_users_with_non_admin_token(client):
    response = client.get("api/v2/users", headers=user1_header)
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data["error"] == "Only Admin can access this resource"


def test_get_users_with_admin_token(client):
    response = client.get("api/v2/users", headers=admin_header)
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["status"] == 200
    assert len(data["data"][0]["users"]) == 2
    assert data["data"][0]["users"][0]["user_name"] == "user1"
