const router = require("express").Router();
const homeRoutes = require("./homeRoutes");

// set up the paths for the routes
router.use("/", homeRoutes);

// export the router
module.exports = router;
