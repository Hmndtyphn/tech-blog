// include router
const router = require("express").Router();

// import models
const { User, Post, Comment } = require("../../models");


//get for all posts
router.get("/", (req, res) => {

    // finds all posts
  Post.findAll({

    // post attributes
    attributes: ["id", "title", "body", "user_id"],

    // array to include comments for post
    include: [
      {
        model: Comment,
        as: "comments",

        // comment attributes
        attributes: ["id", "comment_text", "user_id"],
      },
    ],
  })

//   post to db
    .then((dbPostData) => {
      res.json(dbPostData);
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Post by Id
router.get("/:id", (req, res) => {

    // find one post
  Post.findOne({

    // use ID
    where: {
      id: req.params.id,
    },

    // post attributes
    attributes: ["id", "title", "body", "user_id"],

    // include array for comments
    include: [
      {
        model: Comment,
        as: "comments",

        // comment attributes
        attributes: ["id", "comment_text", "user_id"],
      },
    ],
  }) 
  
    //includes user comments and post
    .then((dbPostData) => {

        // if no id found
      if (!dbPostData) {
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }

    //   otherwise push to db
      res.json(dbPostData);
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//router to add post
router.post("/", (req, res) => {
  
    // creates post with req of attributes
  Post.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id,
  })

//   pushes the data
    .then((dbPostData) => {
      res.json(dbPostData);
    })

    // catches error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); 
    });
});


//updates the post
router.put("/:id", (req, res) => {
  console.log("The id is ", req.params.id);

//   updates post title/ body
  Post.update(
    {
      title: req.body.title,
      body: req.body.body,
    },

    // using ID
    {
      where: {
        id: req.params.id,
      },
    }
  )

//   pushes data 
    .then((dbPostData) => {
      if (!dbPostData) {
        
        // if no post found
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }

    //if no issue
      res.json(dbPostData);
    })

    // catches the error
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});


//deletes the post
router.delete("/:id", (req, res) => {

    // post delete
  Post.destroy({

    // by ID
    where: {
      id: req.params.id,
    },
  })

//   push data
    .then((dbPostData) => {
      if (!dbPostData) {

        // if no post is found
        res.status(404).json({ message: "No Post found with this id" });
        return;
      }

    //   if post is found
      res.json(dbPostData);
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// export router
module.exports = router;