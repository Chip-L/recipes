const router = require("express").Router();
const { Recipe } = require("../models");

/** initial get route for the homepage - this will return latest recipes added to the DB. */
router.get("/", async (req, res) => {
  let noRecipesFound = true;
  let recipes;

  console.log("\n\n***************** Start *****************\n\n");

  const rawRecipes = await Recipe.findAll();

  noRecipesFound = rawRecipes.length < 1;

  if (rawRecipes) {
    recipes = rawRecipes.map((recipe) => recipe.get({ plain: true }));
  }

  console.log("\n\nrecipes:", recipes);
  console.log("\n\n***************** end *****************\n\n");

  res.render("homepage", {
    recipes: recipes,
    loggedIn: req.session.loggedIn,
    noRecipesFound: noRecipesFound,
  });
});

module.exports = router;
