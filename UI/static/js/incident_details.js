const params = new URL(location.href).searchParams;
const urlParameter = params.get('type');

if (urlParameter === "red-flags" || urlParameter === "interventions") {
    getIncident(urlParameter, params.get('id'));
}

const UpdateStatusBtn = document.getElementById('updateStatusBtn');
const cancelEditStatusBtn = document.getElementById('cancelEditStatusBtn');
const editStatusBtn = document.getElementById('editStatusBtn');
const statusField = document.getElementById('statusField');

const updatesLocationBtn = document.getElementById('updateLocationBtn');
const cancelEditLocationBtn = document.getElementById('cancelEditLocationBtn');
const editLocationBtn = document.getElementById('editLocationBtn');
const locationError = document.getElementById('locationError');
const locationMessage = document.getElementById('locationMessage');

function getIncident(incidentType, incidentId) {

    const url = "https://ireporterapiv3.herokuapp.com/api/v2/".concat(incidentType, "/", incidentId);

    fetch(url, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": authorizationHeader,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 401) {
                window.setTimeout(function () {
                    window.location.replace("../index.html");
                }, 5000);


            } else if (data.status === 200) {
                //on success
                let incident = data["data"][0];
                document.getElementById('incidents_output').style.display = 'block';
                document.getElementById("created_on").innerHTML = `
                    <b><i>Date:</i> </b> ${incident.created_on.substring(0, 17)}`;
                document.getElementById("incident_title").innerHTML = incident.title;
                document.getElementById("incident_type").innerHTML = "View " + incident.type + " Details page";
                document.getElementById("incident_comment").innerHTML = incident.comment;
                document.getElementById("created_by").innerHTML = `
                    <img class="bg-blue  img-circle-small" src="../static/img/profile-pics/user1.png">${incident.owner}
                `;

                document.getElementById("incident_status").innerHTML = incident.status;

                //Hide the edit comment button if status is not draft
                if (incident.status !== "Draft") {
                    document.getElementById('editCommentBtn').style.display = 'none';
                    editLocationBtn.style.display = 'none';
                    document.getElementById('delete_incident').style.display = 'none';
                    document.getElementById('add_image').style.display = 'none';
                    document.getElementById('add_video').style.display = 'none';
                }

                document.getElementById('delete_incident').innerHTML = `
                    <button onclick="deleteIncident('${incident.id}')">
                            <i class="fas fa-trash-alt text-white border-radius-pct-50 bg-red">
                        </i></button>
                `;
                let locationCoords = incident.location.replace('(', '').replace(')', '').split(",");
                let latitude = locationCoords[0];
                let longitude = locationCoords[1];
                displayMap([latitude, longitude]);

                let imagesList = incident.images;
                for (let i in imagesList) {
                    if (imagesList.hasOwnProperty(i)) {
                        retrieveImage(imagesList[i]);

                    }

                }


                let videosList = incident.videos;
                for (let i in videosList) {
                    if (videosList.hasOwnProperty(i)) {
                        retrieveVideo(videosList[i]);
                    }
                }

            }
            if (data.status === 400 || data.status === 404) {
                let output = `
                      <h3 class="text-red">Error getting record</h3>
                       <hr>
                
                    <section class="flex-col-sp-btn border-radius-30p border-round-lg">                     

                        <h2 class="text-red"> ${data.error} !</h2>
                          
                    </section>
                `;
                document.getElementById("incident_status").style.display = 'block';

                document.getElementById('incidents_output').innerHTML = output;


            }


        })
        .catch((error) => console.log(error));

}

function updateComment() {

    const incidentType = params.get('type');
    const incidentId = params.get('id');
    const url = "https://ireporterapiv3.herokuapp.com/api/v2/".concat(incidentType, "/", incidentId, "/comment");

    const newComment = document.getElementById('incident_comment').innerHTML;
    fetch(url, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "Authorization": authorizationHeader,
        },
        body: JSON.stringify({"comment": newComment})

    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                document.getElementById('updateCommentBtn').style.display = 'none';
                document.getElementById('cancelEditCommentBtn').style.display = 'none';
                document.getElementById('editCommentBtn').style.display = 'none';
                newComment.innerHTML = data['data'][0].comment;
                document.getElementById('commentMessage').style.display = 'block';

                document.getElementById('commentMessage').innerHTML = data['data'][0].success;
                window.setTimeout(function () {
                    document.getElementById('commentMessage').style.display = 'none';
                    document.getElementById('editCommentBtn').style.display = 'block';

                }, 3000);
                //    remove original comment content from memory
                sessionStorage.removeItem('originalContent');

            } else if (data.status === 400) {
                document.getElementById('commentError').style.display = 'block';

                document.getElementById('commentError').innerHTML = data.error;
                window.setTimeout(function () {
                    document.getElementById('commentError').style.display = 'none';
                    document.getElementById('editCommentBtn').style.display = 'block';
                    document.getElementById('incident_comment').innerHTML = sessionStorage.getItem('originalContent');

                }, 3000);
            } else if (data.status === 401) {
                // if session is expired
                alert(data.error);
                window.setTimeout(function () {
                    localStorage.removeItem('iReporterToken');

                }, 3000);

            }
        })
        .catch((error) => console.log(error.json()));
}


displayUpdateFields("incident_comment", "updateCommentBtn", "cancelEditCommentBtn", "editCommentBtn");


function displayUpdateFields(incidentFieldId, updateButtonId, cancelButtonId, editButtonId) {
    const incidentField = document.getElementById(incidentFieldId);
    const updateField = document.getElementById(updateButtonId);
    const cancelEditField = document.getElementById(cancelButtonId);
    const editField = document.getElementById(editButtonId);

    editField.onclick = function () {
        sessionStorage.setItem('originalContent', incidentField.innerHTML);
        incidentField.contentEditable = true;
        updateField.style.display = 'block';
        cancelEditField.style.display = 'block';
        editField.style.display = 'none';

    };

    cancelEditField.onclick = function () {

        incidentField.contentEditable = false;
        incidentField.innerHTML = sessionStorage.getItem('originalContent');
        sessionStorage.removeItem('originalContent');
        updateField.style.display = 'none';
        cancelEditField.style.display = 'none';
        editField.style.display = 'block';

    };

    updateField.onclick = function () {
        incidentField.contentEditable = false;
        updateField.style.display = 'none';
        cancelEditField.style.display = 'none';
        editField.style.display = 'block';

    }


}


document.getElementById('updateCommentBtn').onclick = updateComment;

editStatusBtn.onclick = function () {

    cancelEditStatusBtn.style.display = 'block';
    UpdateStatusBtn.style.display = 'block';
    editStatusBtn.style.display = 'none';
    // save origin value of status
    sessionStorage.setItem('originalStatus', document.getElementById('incident_status').innerText);

    const originalStatus = sessionStorage.getItem('originalStatus');

    statusField.innerHTML = `
        <select id="incident_status" required   class="showAdmin">
          <option value="${originalStatus}">${originalStatus}</option>
          <option value="draft">Draft</option>
          <option value="resolved">Resolved</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="rejected">Rejected</option>
        </select>
    `
};


function cancelEditStatus() {

    cancelEditStatusBtn.style.display = 'none';
    UpdateStatusBtn.style.display = 'none';
    editStatusBtn.style.display = 'block';

    // Restore the status to its original value
    statusField.innerHTML = `
        status:<b id="incident_status">${sessionStorage.getItem('originalStatus')}</b>
    `;

    // Remove the original value of status from session storage
    sessionStorage.removeItem('originalStatus');

}

cancelEditStatusBtn.onclick = cancelEditStatus;

UpdateStatusBtn.onclick = function () {

    cancelEditStatusBtn.style.display = 'none';
    UpdateStatusBtn.style.display = 'none';
    editStatusBtn.style.display = 'block';

    // Restore the status to its original value
    statusField.innerHTML = `
        status:<b id="incident_status">${sessionStorage.getItem('originalStatus')}</b>
    `;

    // Remove the original value of status from session storage
    sessionStorage.removeItem('originalStatus');

};


function updateStatus() {

    const incidentType = params.get('type');
    const incidentId = params.get('id');
    const url = "https://ireporterapiv3.herokuapp.com/api/v2/".concat(incidentType, "/", incidentId, "/status");
    const newStatus = document.getElementById('incident_status').value;


    fetch(url, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "Authorization": authorizationHeader,
        },
        body: JSON.stringify({"status": newStatus})

    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                UpdateStatusBtn.style.display = 'none';
                cancelEditStatusBtn.style.display = 'none';
                editStatusBtn.style.display = 'none';

                // Display the new value of incident record status
                statusField.innerHTML = `
                    status:<b id="incident_status">${data['data'][0].status}</b>
                `;
                let statusMessage = document.getElementById('statusMessage');
                statusMessage.style.display = 'block';

                statusMessage.innerHTML = data['data'][0].success;
                window.setTimeout(function () {

                    statusMessage.style.display = 'none';
                    editStatusBtn.style.display = 'block';

                }, 3000);

                //Remove origin value of status from memory
                sessionStorage.removeItem('originalStatus');


            } else if (data.status === 400) {

                let statusError = document.getElementById('statusError');
                statusError.style.display = 'block';

                statusError.innerHTML = data.error;
                window.setTimeout(function () {
                    statusError.style.display = 'none';
                    cancelEditStatus()
                }, 3000);
            } else if (data.status === 401) {


                // if session is expired
                alert(data.error);
                window.setTimeout(function () {
                    localStorage.removeItem('iReporterToken');

                }, 3000);

            } else {

                // if session is expired
                alert(JSON.stringify(data.error));

            }
        })
        .catch((error) => console.log(error.json()));
}

UpdateStatusBtn.onclick = updateStatus;


function editLocation() {

    sessionStorage.setItem('showPopUp', 'enabled');
    cancelEditLocationBtn.style.display = 'block';
    updatesLocationBtn.style.display = 'block';
    editLocationBtn.style.display = 'none';

}

editLocationBtn.onclick = editLocation;


function cancelEditLocation() {

    cancelEditLocationBtn.style.display = 'none';
    updatesLocationBtn.style.display = 'none';
    editLocationBtn.style.display = 'block';
    sessionStorage.removeItem('showPopUp');
}

cancelEditLocationBtn.onclick = cancelEditLocation;


function updateLocation() {
    if (!newlocationCoordinates) {
        locationError.style.display = 'block';
        locationError.innerHTML = 'Please Select the new location from the map';

        window.setTimeout(function () {
            locationError.style.display = 'none';


        }, 3000);
    } else {

        const incidentType = params.get('type');
        const incidentId = params.get('id');
        const url = "https://ireporterapiv3.herokuapp.com/api/v2/".concat(incidentType, "/", incidentId, "/location");


        fetch(url, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": authorizationHeader,
            },
            body: JSON.stringify({"location": newlocationCoordinates})

        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    updatesLocationBtn.style.display = 'none';
                    cancelEditLocationBtn.style.display = 'none';
                    editLocationBtn.style.display = 'none';

                    // Display the new value of incident record status
                    locationMessage.style.display = 'block';
                    locationMessage.innerHTML = data["data"][0].success;


                    window.setTimeout(function () {

                        locationMessage.style.display = 'none';
                        editLocationBtn.style.display = 'block';
                        cancelEditLocationBtn.style.display = 'none';

                    }, 3000);
                    //Remove show pop up  on click option from memory
                    sessionStorage.removeItem('showPopUp');


                } else if (data.status === 400) {

                    locationError.innerHTML = data["data"][0].error;


                    window.setTimeout(function () {

                        locationError.style.display = 'none';
                        cancelEditLocation();

                    }, 3000);
                } else if (data.status === 401) {

                    // if session is expired
                    alert(data.error);
                    window.setTimeout(function () {
                        localStorage.removeItem('iReporterToken');

                    }, 3000);


                }
            })
            .catch((error) => console.log(error.json()));

    }
}

updatesLocationBtn.onclick = updateLocation;


function deleteIncident(incidentId) {
    const incidentType = params.get('type');

    const url = "https://ireporterapiv3.herokuapp.com/api/v2/".concat(incidentType, "/", incidentId);


    fetch(url, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "Authorization": authorizationHeader,
        }

    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                document.getElementById('incident_type').innerHTML = data["data"][0].success;

                alert(data["data"][0].success);
                window.location.replace("../incidents/records.html?type=".concat(incidentType));
            } else if (data.status === 400 || data.status === 404) {
                alert(data.error)
            } else if (data.status === 401) {
                alert(data.error)
            } else if (data.status === 403) {
                alert(data.error)
            }

        });

}