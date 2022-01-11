// async function for updating post
async function updateHandler(event) {

    // prevent def
    event.preventDefault();

    // query selector for data update
    //  include title
    const title = document.querySelector("#post-title").value.trim();

    // include body
    const body = document.querySelector("#post-body").value.trim();

    // post id
    const post_id = window.location.toString().split("/") [

        // to location
        window.location.toString().split("/").length -1
    ];

    // ensure body data is there
    if (body) {

        // awaits data fetch of id
        const response = await fetch("/api/posts/" + post_id, {

            // include title/ body
            method: "PUT",
            body: JSON.stringify({
                title,
                body,
            }),

            // adds to header
            headers: {
                "Content-Type": "application/json",
            },
        });

        // checks response
        if (response.ok) {

            // adds to dashbaord
            document.location.replace("/dashboard");
        } else {

            // alert resonse
            alert(response.statusText)
        }
    }
}

// query selector for update post
document
    .querySelector("#create-post-btn")
    .addEventListener("click", updateHandler);