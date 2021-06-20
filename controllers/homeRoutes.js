const router = require("express").Router();

/** initial get route for the homepage - this will return latest recipes added to the DB. */
router.get("/", async (req, res) => {
  let noRecipesFound = true;
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
    noRecipesFound: noRecipesFound,
  });
});

module.exports = router;
