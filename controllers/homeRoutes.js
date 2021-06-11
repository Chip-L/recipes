const router = require("express").Router();
const {
  User,
  Ingredient,
  Recipe,
  RecipeIngredients,
  RecipeSteps,
} = require("../models");

router.get("/", async (req, res) => {
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
