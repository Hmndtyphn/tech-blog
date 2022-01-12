// require router
const router = require("express").Router();

// require models
const { User, Post, Comment } = require("../../models");


//get all comments
router.get("/", (req, res) => {

    // comments find all
  Comment.findAll({

    // include attributes
    attributes: ["id", "comment_text", "user_id", "post_id"],

    // empty array to include user
    include: [
      {
        //   user model
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
  })
  
    // then push to db
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get comment by id
router.get("/:id", (req, res) => {

    // find one comment
  Comment.findOne({

    // use id
    where: {
      id: req.params.id,
    },

    // attributes to use
    attributes: ["id", "comment_text", "user_id", "post_id"],

    // array for user
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],

  }) 
  
  //include comments and posts
    .then((dbCommentData) => {

    // if no comment data
      if (!dbCommentData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }

    //   return if data is there
      res.json(dbCommentData);
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add comment
router.post("/", (req, res) => {

  //creates comment
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id,
  })

//   pushes comment data
    .then((dbCommentData) => {
      res.json(dbCommentData);
    })

    // catches error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err); //REST api needs status
    });
});


//update comment
router.put("/", (req, res) => {
  res.send(`update comment`);
});


//delete comment
router.delete("/:id", (req, res) => {

    // deletes comment
  Post.destroy({

    // by using ID
    where: {
      id: req.params.id,
    },
  })

    // pushes updated data
    .then((dbCommentData) => {

        // if no comment matches id
      if (!dbCommentData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }

    //   otherwise return comment
      res.json(dbCommentData);
    })

    // error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// export router
module.exports = router;