// handles edit of post
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

