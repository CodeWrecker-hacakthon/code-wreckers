function displayError(dataArray) {

    for (let key in dataArray) {

        if ({}.hasOwnProperty.call(dataArray, key)) {
            let fieldError = document.getElementById(key + "-error");
            fieldError.style.display = "block";
            fieldError.innerHTML = dataArray[key];
        }
    }
}


const incidentType = document.getElementById("incident_type");
const incidentTitle = document.getElementById("incident_title");
const incidentComment = document.getElementById("comment");
const incidentLocation = document.getElementById("set_location");
const locationError = document.getElementById("location-error");

incidentTitle.onkeyup = function () {
    const titleError = document.getElementById('title-error');

    if (incidentTitle.value.length < 4) {
        titleError.style.display = "block";
        titleError.innerHTML = "Title must contain atleast 4 characters";
        incidentTitle.setCustomValidity("Invalid record title.");


    } else if (incidentTitle.value.length > 100) {
        titleError.style.display = "block";
        titleError.innerHTML = "Title can not contain more than 100 characters";
        incidentTitle.setCustomValidity("Invalid record title.");

    } else {
        titleError.style.display = "none";
        incidentTitle.setCustomValidity("");

    }


};

incidentComment.onkeyup = function () {
    const commentError = document.getElementById('comment-error');
    if (incidentComment.value.trim().length < 20) {
        incidentComment.setCustomValidity("Invalid comment.");
        commentError.style.display = "block";
        commentError.innerHTML = "Comment should have at least 20 characters";
    } else {
        commentError.style.display = "none";
        incidentComment.setCustomValidity("");
    }
};

incidentComment.onblur = function () {

    if (incidentLocation.value === "") {
        locationError.style.display = "block";
        locationError.innerHTML = "Please pick a location from the map";
        incidentLocation.setCustomValidity("Invalid location Coordinates.");

    } else {
        locationError.style.display = "none";
        incidentLocation.setCustomValidity("");

    }

};


document.getElementById('googleMap').onclick = function () {
    locationError.style.display = "none";
    incidentLocation.setCustomValidity("");

};
function createIncident() {
    const submitProgress = document.getElementById("submit_progress");
    submitProgress.style.display = 'block';

    const url = "https://ireporterapiv3.herokuapp.com/api/v2/incidents";
    const newIncident = {
        title: incidentTitle.value,
        comment: incidentComment.value,
        location: locationCoordinates,
        type: incidentType.value,

    };

    fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": authorizationHeader,
        },
        body: JSON.stringify(newIncident),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 400) {
                //Bad format data
                submitProgress.style.display = 'hide';

                displayError(data.error);


            } else if (data.status === 401) {
                displayError(data.error);
                window.setTimeout(function () {
                    window.location.replace("../index.html");
                }, 5000);


            } else if (data.status === 201) {
                //on success
                submitProgress.style.display = 'hide';

                let newRecord = data["data"][0][incidentType.value];
                let successMsg = data["data"][0]["success"];
                document.getElementById('success_msg').style.display = "block";
                document.getElementById('success_msg').innerHTML = `Successfully ${successMsg} !`;
                window.setTimeout(function () {
                    window.location.replace(`./details.html?type=${newRecord.type}s&id=${newRecord.id}`);
                }, 1000);


            }


        })
        .catch((error) => console.log(error));

}

