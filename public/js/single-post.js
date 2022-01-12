// async func for submit
async function commentHandler(event) {

    // prevent default
    event.preventDefault();

    // pulls info and sets to location
    const post_id = window.location.toString().split("/") [

        // location array
        window.location.toString().split("/").length -1
    ];

    // add comment string to post
    const comment_text = document.querySelector("#comment-text").value.trim();

    if (comment_text) {

        // await fetch of comment
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                comment_text,
                post_id,
            }),
            // adds to header
            headers: {
                "Content-Type": "application/json",
            },
        });

        // checks is response is ok
        if (response.ok) {

            // if ok, reload location
            document.location.reload();
        } else {

            // alert response if not
            alert(response.statusText);
        }
    }
}

// event listener for comment creation
document
    .querySelector("#post-comment-btn")
    .addEventListener("click", commentHandler);