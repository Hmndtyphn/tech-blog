// require express router
const router = require("express").Router();

// requires home routes
const homeRoutes = require("./home-routes");




// use router
router.use("/", homeRoutes);


// export router
module.exports = router;