// login for handler
async function loginHandler(event) {

    // prevents default
    event.preventDefault();

    // password quert selector
    const password = document.querySelector("#password-login").value.trim();

    // email query selector
    const email = document.querySelector("#email-login").value.trim();

    // ensure login data is completed
    if (email && password) {

        // response awaits fetch from login
        const response = await fetch("/api/users/login", {
            method: "post",

            // json string for email and password
            body: JSON.stringify({
                email,
                password,
            }),

            headers: { "Content-Type": "application/json" },
        });

        // if correct
        if (response.ok) {

            // console log login string
            console.log(response, "You are logged in!");
            // replaces location
            document.location.replace("/");

            //  else statement for login error
        } else {
            alert(response.statusText);
        }
    }
}

// signup as user
async function signupHandler(event) {

    // prevents default
    event.preventDefault();

    // defines signup info

    // username
    const username = document.querySelector("#username-signup").value.trim();

    // password
    const password = document.querySelector("#password-signup").value.trim();

    // email
    const email = document.querySelector("#email-signup").value.trim();

    // ensure all fields are filled in
    if (username && password && email) {

        // awaits fetch response for users
        const response = await fetch ("/api/users", {
            method: "POST",

            // string for signup
            body: JSON.stringify({
                username,
                password,
                email,
            }),
            headers: { "Content-Type": "application/json" },
        });

        // if correct, log response
        if (response.ok) {
            console.log(response);

            // throw error is issue
        } else {
            alert(response.statusText)
        }

        // request to login into page
        const responseLogin = await fetch("/api/users/login", {
            method: "post",
            body: JSON.stringify({
                email,
                password,
            }),

            // add content to headers
            headers: { "Content-Type": "application/json" },
        });

        // if login passes
        if (responseLogin.ok) {
            console.log(response, " You are Logged in!");

            // replace login page
            document.location.replace("/");
        } else {

            // error response
            alert(response.statusText);
        }
    }
}

// event listener for login
document
    .querySelector("#login-btn")
    .addEventListener("click", loginHandler);

// event listener for signup btn
document
    .querySelector("#signup-btn")
    .addEventListener("click", signupHandler);