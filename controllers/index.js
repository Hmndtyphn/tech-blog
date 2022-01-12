// require express router
const router = require("express").Router();

// requires home routes
const homeRoutes = require("./home-routes");

// require user routes
const userRoutes = require("./api/user-routes");

// require post routes
const postRoutes = require("./api/post-routes");

// require comment routes
const commentRoutes = require("./api/comment-routes");



// use router
router.use("/", homeRoutes);

// use user routes
router.use("/", userRoutes);

// use post routes
router.use("/", postRoutes);

// use comment routes
router.use("/", commentRoutes);


// export router
module.exports = router;