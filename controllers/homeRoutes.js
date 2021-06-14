const router = require("express").Router();
const {
  User,
  Ingredient,
  Recipe,
  RecipeIngredient,
  RecipeSteps,
} = require("../models");

/** initial get route for the homepage - this will return latest recipes added to the DB. */
router.get("/", async (req, res) => {
  let noRecipesFound = true;
  res.render("homepage", {
    loggedIn: req.session.loggedIn,
    noRecipesFound: noRecipesFound,
  });
});

router.get("/test", async (req, res) => {
  try {
    console.log("\n\n***************** Start *****************\n\n");
    // find the recipe
    const recipe = await Recipe.findByPk(1);
    console.log("\n\nrecipe:", recipe.get({ plain: true }));

    // find the ingredient or create it -- this returns an array rather than an object, the first element of the array is the object, the second element is a boolean for created. This takes the raw array and then later reassigns the value (the raw object - so it will need searlized) to a differnt variable.
    const ingredient1raw = await Ingredient.findOrCreate({
      where: {
        name: "some-ingredient",
      },
    }); //returns [Ingredient, created]
    const ingredient1 = ingredient1raw[0];

    console.log(
      "\n\ningredient1:",
      ingredient1.get({ plain: true }),
      "\ncreated",
      ingredient1raw[1]
    );
    // console.log("\n\ningredient1 (raw??):", ingredient1);

    const ingredient2raw = await Ingredient.findOrCreate({
      where: {
        name: "another-ingredient",
      },
    }); // returns []
    const ingredient2 = ingredient2raw[0];
    console.log(
      "\n\ningredient2:",
      ingredient2.get({ plain: true }),
      "\ncreated",
      ingredient2raw[1]
    );

    // this returns an array of ingredients associated with the recipe - again, raw objects.
    let ingredientList = await recipe.getIngredients();
    console.log(
      "\n\nrecipe.getIngredients(): ",
      ingredientList.map((ingredient) => ingredient.get({ plain: true }))
    ); // []

    // counts the number of ingredient RECIPE has (INTEGER)
    console.log(
      "\n\nrecipe.countIngredients()",
      await recipe.countIngredients()
    ); // 0

    // checks to see if the RECIPE has a specific INGREDIENT (t/f)
    console.log(
      "\n\nrecipe.hasIngredient(ingredient1)",
      await recipe.hasIngredient(ingredient1)
    ); // false

    // can't run until I figure out how to add the extra data...
    // await recipe.addIngredients([ingredient1, ingredient2]);
    // console.log(
    //   "\n\nrecipe.countIngredients()",
    //   await recipe.countIngredients()
    // ); // 2

    // actually adds an ingredient. use the through option to add the additional required values in to the join table.
    await recipe.addIngredient(ingredient1, {
      through: { amount: "1 cup" },
    });
    console.log("\n\nadded ingredient1");

    await recipe.addIngredient(ingredient2, {
      through: { amount: "1 cup" },
    });
    console.log("\n\nadded ingredient2");

    // recounts the ingredients
    console.log(
      "\n\nrecipe.countIngredients()",
      await recipe.countIngredients()
    ); // 2

    // rechecks if ingredient 1 is in the RECIPE
    console.log(
      "\n\nrecipe.hasIngredient(ingredient1)",
      await recipe.hasIngredient(ingredient1)
    ); // true

    // removes ingredient from the recipe.
    await recipe.removeIngredient(ingredient2);
    console.log("\n\nremoved ingredient2");
    console.log(
      "\n\nrecipe.countIngredients()",
      await recipe.countIngredients()
    ); // 1

    /*
    // need syntax for this
    await recipe.createIngredient(
      { name: "yet-another-ingredient" }, through:
      { amount: "1 tsp" }
    );
    console.log(
      "\n\nrecipe.countIngredients()",
      await recipe.countIngredients()
    ); // 2
*/

    await recipe.setIngredients([]); // Un-associate all previously associated ingredients

    console.log(
      "\n\nrecipe.countIngredients()",
      await recipe.countIngredients()
    ); // 0
    console.log("\n*****************\n\n");
    /* */

    res.status(200);
  } catch (err) {
    console.log("\n\n*****************\n", err, "\n*****************\n\n");
    res.status(404).send(err);
  }
});

module.exports = router;
