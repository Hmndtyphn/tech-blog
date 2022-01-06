// edit a post
async  function editPost(event) {
    event.preventDefault();

    // Post data from user
    const title = document.querySelector("#post-title").innerHTML;
    const body = document.querySelector("#post-body").innerHTML;
    const post_id = window.location.toString().split("/") [
        window.location.toString().split("/").length - 1
    ];

    // logs title/ body
    console.log(title, body);

    // replace post id/ edit
    document.location.replace("/edit/" + post_id);
}

// delete a post
async function deletePost(event) {
    event.preventDefault();

    // post delete request
    const post_id = window.location.toString().split("/")[

        // reduces post by 1
        window.location.toString().split("/").length - 1
    ];

    // awaits post, then deletes content
    const response = await fetch("/api/posts/" + post_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    // checks for response 
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        // alert response 
        alert(response.statusText);
    }
}

//  edit current post on click event listener
document.querySelector("#edit-btn").addEventListener("click", editPost);

// delete current post on click event listener
document
    .querySelector("#delete-btn")
    .addEventListener("click", deletePost);
    

