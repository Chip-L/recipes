const router = require("express").Router();
const homeRoutes = require("./homeRoutes");
const testRoutes = require("./testRoutes");

// set up the paths for the routes
router.use("/", homeRoutes);
router.use("/test", testRoutes);

// export the router
module.exports = router;
