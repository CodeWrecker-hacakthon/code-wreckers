let params = new URL(location.href).searchParams;
let urlParameter = params.get('type');
if (urlParameter === 'red-flags' || urlParameter === 'interventions') {

    getIncidents(urlParameter);
}


function getIncidents(incidentType, status = "") {

    let url = "https://ireporterapiv3.herokuapp.com/api/v2/".concat(incidentType);
    const incidentStatus = params.get('status');
    if (params.get('status')) {
        console.log('status', incidentStatus);
        url += "?status=" + incidentStatus;
    }

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
                let incidents = data["data"];
                let output = `
                <h3 class="text-blue">View ${incidentType} page</h3>
                <hr>
               `;

                if (incidents.length === 0) {
                    if (incidentStatus) {
                        output += `
                            
                            <section class="flex-col-sp-btn border-radius-30p border-round-lg">
                                    <h2>No  ${incidentType} records are ${incidentStatus.replace("_", " ")} !</h2>
                                  
                            </section>
                        `;
                    } else {
                        output += `
                            
                            <section class="flex-col-sp-btn border-radius-30p border-round-lg">
                                    <h2>No  ${incidentType} records are available !</h2>
                                  
                            </section>
                            
                       `;
                    }

                }
                incidents.forEach(function (incident) {


                    output += `


                <section class="flex-col-sp-btn border-radius-30p border-round-lg">
                        <h2 class="wrap_content">${incident.title}</h2>
                        <span class="text-blue"><b><i>Date:</i> </b> ${incident.created_on.substring(0, 17)}</span>

                        <div class="flex-row-sp-btn">


                            <span class="text-lblack ">
                                <img class="bg-blue  img-circle-small" src="../static/img/profile-pics/user1.png">${incident.owner}


                            </span>
                        </div>
                        <div class="flex-row-sp-btn"><b>Description : </b>
                            <p class="wrap_content">
                                ${incident.comment}
                            </p>

                           
                            <a href="../incidents/details.html?type=${incident.type}s&id=${incident.id}" class="text-blue">view details</a>
                            
                            
                            <p class="text-orange"><b>status: <i>${incident.status}</i></b></p>
                        </div>
                        


                    
                    </section>
            `;


                });
                document.getElementById('incidents_output').innerHTML = output;

            }


        })
        .catch((error) => console.log(error));


}
