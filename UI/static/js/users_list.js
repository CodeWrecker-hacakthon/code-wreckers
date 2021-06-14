fetch("https://ireporterapiv3.herokuapp.com/api/v2/users", {
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
            const users = data["data"][0]['users'];
            const noOfUsers = sessionStorage.getItem('iRUsers');
            document.getElementById('no_users').innerHTML = `
                (${noOfUsers})`;

            let output = ` `;

            if (users.length === 0) {
                output += `
            
                
                <section class="flex-col-sp-btn border-radius-30p border-round-lg">
                        <h2>No  users are  available !</h2>
                      
                </section>
               `

            }


            for (let idx in users) {
                if (users.hasOwnProperty(idx)) {

                    output +=
                        `<div class="card">
                            <div class="content">
                            <div class="bg-lblue  border-radius-30p">
                                <img src="../static/img/profile-pics/user1.png" class="img-profile"
                            alt="profile picture">
                                <p>Username: ${users[idx].user_name}</p>
                            <p>First Name: ${users[idx].first_name}</p>
                            <p>Last Name: ${users[idx].last_name}</p>
                            <p style="display: none;">Other Names: </p>
                            <p>Tel: ${users[idx].phone_number}</p>
                            <p>Email: ${users[idx].email}</p>
                            <p>Registered On: ${users[idx].registered_on.substring(0, 17)}</p>
                        </div>
                        </div>
                        </div>
                    `;


                }
            }
            document.getElementById('users_list').innerHTML = output;

        }


    })
    .catch((error) => console.log(error));


