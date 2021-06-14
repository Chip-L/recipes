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

    const recipe = await Recipe.findByPk(1);
    console.log("\n\nrecipe:", recipe.get({ plain: true }));

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
      ingredient2[1]
    );

    let ingredientList = await recipe.getIngredients();
    console.log(
      "\n\nrecipe.getIngredients(): ",
      ingredientList.map((ingredient) => ingredient.get({ plain: true }))
    ); // []
    console.log(
      "\n\nrecipe.countIngredients()",
      await recipe.countIngredients()
    ); // 0
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

    await recipe.addIngredient(ingredient1, {
      through: { amount: "1 cup" },
    });
    console.log("\n\nadded ingredient1");

    await recipe.addIngredient(ingredient2, {
      through: { amount: "1 cup" },
    });
    console.log("\n\nadded ingredient2");
    console.log(
      "\n\nrecipe.countIngredients()",
      await recipe.countIngredients()
    ); // 2

    console.log(
      "\n\nrecipe.hasIngredient(ingredient1)",
      await recipe.hasIngredient(ingredient1)
    ); // true

    await recipe.removeIngredient(ingredient2);
    console.log(
      "\n\nrecipe.countIngredients()",
      await recipe.countIngredients()
    ); // 1

    /*
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
