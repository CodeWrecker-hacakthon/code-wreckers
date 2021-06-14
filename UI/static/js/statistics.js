fetch("https://ireporterapiv3.herokuapp.com/api/v2/statistics", {
    method: "GET",
    headers: {
        "content-type": "application/json",

        "Authorization": authorizationHeader
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
            const incidents = data["data"][0]["statistics"];

            sessionStorage.setItem('iRUsers', incidents["users"]);
            document.getElementById('red-flags').innerHTML = `
                <h3 class="text-red">
                    <i class="fa fa-flag text-lred" aria-hidden="true">&nbsp;</i>
                        Red-flags (${incidents['red-flags']['total']})
                </h3>
                <div class="dashboard-items">
                    <div class="dash bg-lyellow text-orange">
                        <div class="dash-stat bg-orange">${incidents['red-flags']['draft']}
                        </div>
                        <a href="records.html?type=red-flags&&status=draft">
                            <div>Draft</div>
                        </a>
                    </div>
                    <div class="dash bg-lblue text-blue">
                    <div class="dash-stat bg-blue">${incidents['red-flags']['under_investigations']}</div>
                    <a href="records.html?type=red-flags&&status=under_investigation">
                        <div> Under Investigation</div>
                    </a>
                </div>
                <div class="dash bg-lgreen text-green">
                    <div class="dash-stat bg-green">${incidents['red-flags']['resolved']}</div>
                    <a href="records.html?type=red-flags&&status=resolved">
                        <div>Resolved</div>
                    </a>
                    </div>
                    <div class="dash bg-pink text-red">
                      <div class="dash-stat bg-red">${incidents['red-flags']['rejected']}</div>
                      <a href="records.html?type=red-flags&&status=rejected">
                        <div>Rejected</div>
                      </a>
                    </div>
                </div>
            `;
            document.getElementById('interventions').innerHTML = `
                <h3 class="text-green">
                    <i class="fa fa-cubes text-green" aria-hidden="true">&nbsp;</i>
                    Interventions (${incidents['interventions']['total']})
                </h3>

                <div class="dashboard-items">
                    <div class="dash bg-lyellow text-orange">
                        <div class="dash-stat bg-orange">${incidents['interventions']['draft']}</div>
                        <a href="records.html?type=interventions&&status=draft">

                            <div>Draft</div>
                        </a>
                    </div>
                    <div class="dash bg-lblue text-blue">
                        <div class="dash-stat bg-blue">${incidents['interventions']['under_investigations']}</div>
                        <a href="records.html?type=interventions&&status=under_investigation">
                            <div>Under Investigation</div>
                        </a>
                    </div>
                    <div class="dash bg-lgreen text-green">
                        <div class="dash-stat bg-green">${incidents['interventions']['resolved']}</div>
                        <a href="records.html?type=interventions&&status=resolved">
                            <div>Resolved</div>
                        </a>
                    </div>
                    <div class="dash bg-pink text-red">
                        <div class="dash-stat bg-red">${incidents['interventions']['rejected']}</div>
                        <a href="records.html?type=interventions&&status=rejected">
                            <div>Rejected</div>
                        </a>
                    </div>
                  
                </div>

            `;
            let userInfo = ``;
            if ("users" in incidents === true) {
                userInfo += `
                <h3 class="text-blue">
                    <i class="fa fa-users text-lblue" aria-hidden="true">&nbsp;</i>
                        Users 
                </h3>
                <div class="dash bg-lblue text-blue">
                    <div class="dash-stat bg-lblue">${incidents['users']}</div>
                    <a href="../user/index.html">
                        <div class="bg-purple">Users</div>
                    </a>
                </div><br/>`;
            }


            userInfo += `
                <img src="../static/img/profile-pics/user1.png" class="img-profile" alt="profile picture">
                <p>Username: ${sessionStorage.getItem('iRUsername')}</p>
                <p>First Name: ${sessionStorage.getItem('iRFirstName')}</p>
                <p>Last Name: ${sessionStorage.getItem('iRlastName')}</p>
                <p id="other_names">Other Names: ${sessionStorage.getItem('iROtherNames')}</p>
                <p>Tel: ${sessionStorage.getItem('iRPhoneNumber')}</p>
                <p>Email: ${sessionStorage.getItem('iREmail')}</p>
                `;


            document.getElementById('user_dash_info').innerHTML = userInfo;

            if (!sessionStorage.getItem('iROtherNames')) {
                document.getElementById('other_names').style.display = 'none';
            }


        }


    })
    .catch((error) => console.log(error));

