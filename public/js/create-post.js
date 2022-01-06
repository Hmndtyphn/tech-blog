//  async function for creating post
async function createPost(event) {
    event.preventDefault();

    // gets title/ body info from user
    const title = document.querySelector("#post-title").value.trim();
    // body info
    const body = document.querySelector("#post-body").value.trim();

    // sets session data from user
    if (body) {

        // comment info
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                title,
                body,
            }),
        });

        //  ensures response
        if (response.ok) {

            // replaces post id
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        }
    }
}

// add query selector
// add event listener
document
    .querySelector("#create-post-btn")
    // event listener to create post
    .addEventListener("click", createPost);