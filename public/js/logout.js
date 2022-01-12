// logout asynch function
async function logout() {

    // await logout
    const response = await fetch("/api/users/logout", {

        // post method, to header
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    // if it passes
    if (response.ok) {

        // replace location
        document.location.replace("/");
    } else {

        // alert for issue
        alert(response.statusText);
    }
}

// logout event listener
document.querySelector("#logout-btn").addEventListener("click", logout);