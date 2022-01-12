// require express router
const router = require("express").Router();

// require models
const { User, Post, Comment } = require("../models");

// require sequelize
const sequelize = require("../config/connection");

// home router
router.get("/", (req, res) => {

    // get all Post data
    Post.findAll({
        // get all attributes
        attributes: ["id", "title", "body", "user_id"],

        // array to include user, comment
        include: [
            {
                // includes user
                model: User,
                as: "user",
                attributes: ["username"],
            },

            {
                // include model & attributes
                model: Comment,
                as: "comments",
                attributes: ["id", "comment_text", "user_id"], 
            },
        ],
    })

    // post data to db
    .then((dbPostData) => {

        // add id 
        if (!dbPostData) {
            res.status(404).json({ message: "No associated Posts!"});
            return;
        }

        // maps the data
        const posts = dbPostData.map((post) => post.get({ plain:true }));
        console.log(posts);

        // render to home
        res.render("home", { posts, loggedIn: req.session.loggedIn });
    })

    // catch errpr
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// single post
router.get("/viewpost/:id", (req, res) => {

    // get all posts
    Post.findOne({
        // request id params
        where: {
            id: req.params.id,
        },

        // attributes of post
        attributes: m["id", "title", "body", "user_id"],

        // include user, comment array
        include: [
            {
            // include user model
            model: User,
            as: "user",
            attributes: ["username"],
        },
        {
        // include comments model
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id"],

        // array to include User model in Comment
        include: [
            {
                // user mode
                model: User,
                as: "user",
                attributes: ["username"],
            },
                ],
            },
        ],
    })

    // then post data
    .then((dbPostData) => {

        // if post is correct
        if (!dbPostData) {
            res.status(404).json({ message: "No current posts available"});
            return;
        }
        
        // post data to id, 
        const posts = dbPostData.get({ plain: true });
        console.log(posts);

        // require id
        const newPost = post.user_id == req.session.user_id;
        res.render("single-post", {

            // require login
            post,
            loggedIn: req.session.loggedIn,
            currentUser: newPost,
        });
    })

    // catch error
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// routes to login page
router.get("/login", (req, res) => {

    // requires session login
    console.log("please login!", req.session.loggedIn);
    res.render("login", {loggedIn: req.session.loggedIn });
});


// routes to dash
router.get("/dashboard", (req, res) => {

    // get all posts
    console.log(req.session.user_id, " Youre current session id");

    // find all posts
    Post.findAll({

        // include user and comment
        // require login
        where: {
            user_id: req.session.user_id,
        },
        // attributes to include
        attributes: ["id", "title", "body", "user_id"],
        // array to include user /comment
        include: [
        {
            model: User,
            as: "user",
            attributes: ["username"],
        },

        {
            // include comments
            model: Comment,
            as: "comments",
            attributes: ["id", "comment_text", "user_id"],
            include: [
                {
                    // include user model for comment
                    model: User,
                    as: "user",
                    attributes: ["username"],
                },
            ],
        },
        ],
    })

    // include post data
    .then((dbPostData) => {

        // if no posts
        if (!dbPostData) {
            res.status(404).json({ message: "no current posts!"});
            return;
        }

        //    post map
        const posts = dbPostData.map((post) => post.get({ plain: true}));
        console.log(posts);

        // render to dash
        res.render("dashboard", { posts, loggedIn: req.session.loggedIn});
    })

    // catch error
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post router
router.get("/post", (req, res) => {
    // post after login
    res.render("create-post", { loggedIn: req.session.loggedIn });
});

// edit page router
router.get("/edit/:id", (req, res) => {

    // require post id
    res.render("edit-post", {
        // require login
        loggedIn: req.session.loggedIn,
        // require post id
        post_id: req.params.id,
    });
});

// export router
module.exports = router;

