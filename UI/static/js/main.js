const authorizationHeader = "Bearer ".concat(localStorage.getItem("iReporterToken"));

if (localStorage.getItem('iReporterToken')) {

    getUserInfo()
} else {
    window.location.replace("../index.html");

}
window.setInterval(getUserInfo, 300000);


function getUserInfo() {
    fetch("https://ireporterapiv3.herokuapp.com/api/v2/auth/secure", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": authorizationHeader,

        },
    })
        .then((response) => response.json())
        .then((data) => {

            if (data.status === 401) {
                alert(data.error);
                redirectLoggedOut()

            } else if (data.status === 200) {
                //on success

                let userInfo = data["data"][0]["user"];


                sessionStorage.setItem('iRUsername', userInfo["username"]);
                sessionStorage.setItem('iRFirstName', userInfo["firstname"]);
                sessionStorage.setItem('iRlastName', userInfo["lastname"]);
                sessionStorage.setItem('iROtherNames', userInfo["othernames"]);
                sessionStorage.setItem('iREmail', userInfo["email"]);
                sessionStorage.setItem('iRPhoneNumber', userInfo["phone_number"]);


                document.getElementById('sessionUserName').innerHTML = userInfo["username"];

                if (userInfo["is_admin"]) {
                    setElementDisplay(".hideAdmin", "none");
                    setElementDisplay(".showAdmin", "block");
                } else {

                    setElementDisplay(".hideAdmin", "block");
                    setElementDisplay(".showAdmin", "none");

                }

            }


        })
        .catch((error) => console.log(error));

}

function setElementDisplay(elemRef, displayPropety) {
    Array.from(document.querySelectorAll(elemRef))
        .forEach(function (elem) {
            elem.style.display = displayPropety
        });

}


function logOut() {

    fetch("https://ireporterapiv3.herokuapp.com/api/v2/auth/logout", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": "Bearer ".concat(localStorage.getItem("iReporterToken")),
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                alert(data['data'][0].success);
                redirectLoggedOut()
            } else if (data.status === 401) {
                localStorage.removeItem('iReporterToken');
                alert(data.error);
                redirectLoggedOut()

            }


        })
        .catch((error) => console.log(error));

}

function redirectLoggedOut() {
    localStorage.removeItem('iReporterToken');
    sessionStorage.removeItem('iRUsername');
    sessionStorage.removeItem('iRFirstName');
    sessionStorage.removeItem('iRlastName');
    sessionStorage.removeItem('iROtherNames');
    sessionStorage.removeItem('iREmail');
    sessionStorage.removeItem('iRPhoneNumber');
    sessionStorage.removeItem('iRUsers');
    window.location.replace("../index.html");

}

