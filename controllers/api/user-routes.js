// require router
const router = require("express").Router();

// require models
const { User, Post, Comment } = require("../../models");


//get all users
router.get("/", (req, res) => {

    // find all users
  User.findAll({

    // user attributes
    attributes: ["id", "username", "email", "password"],
    
    // array to include post and comment
    include: [
      {
        //   post model
        model: Post,
        as: "posts",

        // include attributes
        attributes: ["id", "title", "body"],
      },


      {
        //   comment model
        model: Comment,
        as: "comments",

        // include attributes
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  }) 
  
    //include comments and posts
    .then((dbUserData) => {
      res.json(dbUserData);
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get user by id
router.get("/:id", (req, res) => {

    // find one user
  User.findOne({

    // require id
    where: {
      id: req.params.id,
    },

    // attributes to include
    attributes: ["id", "username", "email", "password"],
    
    // array to include post and comment
    include: [
      {
        //   post model
        model: Post,
        as: "posts",

        // attr to include
        attributes: ["id", "title", "body"],
      },

      {
        //   include comments model
        model: Comment,
        as: "comments",

        // attr to use
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  }) //incudes comments and posts
    .then((dbUserData) => {
      if (!dbUserData) {

        // if no user found
        res.status(404).json({ message: "No User found with this id" });
        return;
      }

    //   otherwise return
      res.json(dbUserData);
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//add user
router.post("/", (req, res) => {

    // create user with below data
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })

    // saves to db
    .then((dbUserData) => {
      
        // saves to current session data
      req.session.save(() => {
        req.session.user_id = dbUserData.id; 
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        res.json(dbUserData);
      });
    })

    // catch error
    .catch((err) => {
      res.status(500).json(err);
    });
});


//login user
router.post("/login", (req, res) => {
  
    // find one user
  User.findOne({

    // use email
    where: {
      email: req.body.email,
    },
  })

//   add to db
    .then((dbUserData) => {
      
        // does user exist
      if (!dbUserData) {
        //   user not found message
        res.status(400).json({ message: "User not found" });
        return;
      }

    //   ensure password is correct
      const validPassword = dbUserData.checkPassword(req.body.password);

    //   if password is incorrect
      if (!validPassword) {
        res.status(400).json({ message: "Incorrect Password!" });
        return;
      }

      //saves to current session
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;


        //once logged in
        res.json({ user: dbUserData, message: "You are now logged in!" });
      });
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


//put to update user
router.put("/", (req, res) => {
  res.send(`update user`); 
});

//delete user
router.delete("/:id", (req, res) => {
  User.destroy({

    // from id
    where: {
      id: req.params.id,
    },
  })

    // once deleted
    .then((dbUserData) => {

        // if user id doesnt exist
      if (!dbUserData) {
        res.status(404).json({ message: "No User found with this id" });
        return;
      }

    //   otherwise return data
      res.json(dbUserData);
    })

    // catch error
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Log out the user
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {

    // stops the session
    req.session.destroy(() => {
      
        // session ends here
      res.status(204).end();
    });


  } else {
    res.status(404).end(); 
  }
});

// export router
module.exports = router;