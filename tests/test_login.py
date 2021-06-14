from flask import json

mimetype = "application/json"
headers = {"Content-Type": mimetype, "Accept": mimetype}
valid_user = {
    "firstname": "Arthur",
    "lastname": "Kagimu",
    "othernames": "",
    "email": "arthurkalule@gmail.com",
    "phoneNumber": "0772262450",
    "username": "arthurk",
    "password": "Password123",
}
token_to_test_logout = None


def test_user_login_with_valid_credentials_(client):
    "Tests login a user "
    # create user
    register_response = client.post(
        "/api/v2/auth/signup", data=json.dumps(valid_user), headers=headers
    )
    assert register_response.status_code == 201
    data = json.loads(register_response.data.decode())
    assert data["data"][0]["user"]["email"] == "arthurkalule@gmail.com"


def test_user_login_without_data_(client):
    response = client.post("/api/v2/auth/login", headers=headers)
    data = json.loads(response.data.decode())
    assert response.status_code == 400
    assert data["error"] == "Provide provide valid data to login"


def test_user_login_with_wrong_credentials_(client):
    response = client.post(
        "/api/v2/auth/login",
        data=json.dumps({"username": "usehr1", "password": "Password123"}),
        headers=headers,
    )
    assert response.status_code == 401
    data = json.loads(response.data.decode())
    assert data["error"] == "Invalid credentials"


def test_user_login_with_wrong_keys_in_credentials_data(client):
    response = client.post(
        "/api/v2/auth/login",
        data=json.dumps({"usrname": "user9", "password": "Password123"}),
        headers=headers,
    )
    assert response.status_code == 422
    data = json.loads(response.data.decode())
    assert data["error"] == "Please provide the correct keys for the data"


def test_user_login_with_correct_credentials_data(client):
    response = client.post(
        "/api/v2/auth/login",
        data=json.dumps({"username": "arthurk", "password": "Password123"}),
        headers=headers,
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"][0]["success"] == "Logged in successfully"
    assert "token" in data["data"][0]

    assert data["status"] == 200

def test_user_logout(client):
    response = client.post(
        "/api/v2/auth/login",
        data=json.dumps({"username": "admin", "password": "iReporter123"}),
        headers=headers,
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"][0]["success"] == "Logged in successfully"
    assert data["status"] == 200
    assert "token" in data["data"][0]
    token = data["data"][0]["token"]
    headers["Authorization"] = "Bearer " + token

    response = client.post(
        "/api/v2/auth/logout",
        # data=json.dumps({"username": "arthurk", "password": "Password123"}),
        headers=headers,
    )
    assert response.status_code == 200
    data = json.loads(response.data.decode())
    assert data["data"][0]["success"] == "Logged out successfully"
    assert data["status"] == 200

