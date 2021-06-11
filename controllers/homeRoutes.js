const router = require("express").Router();
const {
  User,
  Ingredient,
  Recipe,
  RecipeIngredients,
  RecipeSteps,
} = require("../models");

router.get("/", async (req, res) => {
  let noRecipesFound = true;
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
    noRecipesFound,
  });
});

module.exports = router;
