const router = require("express").Router();
const {
  User,
  Ingredient,
  Recipe,
  RecipeIngredient,
  RecipeSteps,
} = require("../models");
const { printObject } = require("../utils/routeHelpers");

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
    let message = "";
    let ingredient, ingredientCount, ingredientCheck;

    console.log("\n\n***************** Start *****************\n\n");
    // find the recipe
    const recipe = await Recipe.findByPk(1);
    console.log("\n\nrecipe:", recipe.get({ plain: true }));
    message +=
      "<div><h3>const recipe = await Recipe.findByPk(1):</h3>" +
      printObject(recipe.get({ plain: true })) +
      "</div>";

    // find the ingredient or create it -- this returns an array rather than an object, the first element of the array is the object, the second element is a boolean for created. This takes the raw array and then later reassigns the value (the raw object - so it will need searlized) to a differnt variable.
    const ingredient1raw = await Ingredient.findOrCreate({
      where: {
        name: "some-ingredient",
      },
    }); //returns [Ingredient, created]
    const ingredient1 = ingredient1raw[0];

    ingredient = ingredient1.get({ plain: true });
    console.log("\n\ningredient1:", ingredient, "\ncreated", ingredient1raw[1]);
    message += `<div>
        <h3>const ingredient1raw = await Ingredient.findOrCreate({ where: { name: "some-ingredient" } }); //returns [Ingredient, created]</h3>
        <div class="array">
          ${printObject(ingredient)},
          <div>created: ${ingredient1raw[1]}</div>
        </div>
      </div>`;
    // console.log("\n\ningredient1 (raw??):", ingredient1);

    const ingredient2raw = await Ingredient.findOrCreate({
      where: {
        name: "another-ingredient",
      },
    }); // returns []
    const ingredient2 = ingredient2raw[0];
    ingredient = ingredient2.get({ plain: true });
    console.log("\n\ningredient2:", ingredient, "\ncreated", ingredient2raw[1]);
    message += `<div>
        <h3>const ingredient2raw = await Ingredient.findOrCreate({ where: { name: "another-ingredient" } }); //returns [Ingredient, created]</h3>
        <div class='array'>
          ${printObject(ingredient)},
          <div>created: ${ingredient2raw[1]}</div>
        </div>
      </div>`;

    // this returns an array of ingredients associated with the recipe - again, raw objects.
    let ingredientList = await recipe.getIngredients();
    console.log(
      "\n\nrecipe.getIngredients(): ",
      ingredientList.map((ingredient) => ingredient.get({ plain: true }))
    ); // []
    message += `<div>
        <h3>recipe.getIngredients():</h3>
        <div class='array'>
        ${
          ingredientList.length > 0
            ? ingredientList.map(
                (ingredient) =>
                  printObject(ingredient.get({ plain: true })) + ","
              )
            : "<div></div>"
        }
        </div>
      </div>`; // []

    // counts the number of ingredient RECIPE has (INTEGER)
    ingredientCount = await recipe.countIngredients();
    console.log("\n\nrecipe.countIngredients()", ingredientCount); // 0
    message += `<div>
      <h3>recipe.countIngredients()</h3> 
      <div class="value"> ${ingredientCount}</div>
    <div>`; // 0

    // checks to see if the RECIPE has a specific INGREDIENT (t/f)
    ingredientCheck = await recipe.hasIngredient(ingredient1);
    console.log("\n\nrecipe.hasIngredient(ingredient1)", ingredientCheck); // false
    message += `<div>
      <h3>await recipe.hasIngredient(ingredient1)</h3> 
      <div class="value"> ${ingredientCheck}</div>
    <div>`; // false

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
    message += `<h3>await recipe.addIngredient(ingredient1, { through: { amount: "1 cup" } });</h3>`;

    await recipe.addIngredient(ingredient2, {
      through: { amount: "1 tsp" },
    });
    console.log("\n\nadded ingredient2");
    message += `<h3>await recipe.addIngredient(ingredient2, { through: { amount: "1 tsp" } });</h3>`;

    // this returns an array of ingredients associated with the recipe - again, raw objects.
    ingredientList = await recipe.getIngredients();
    console.log(
      "\n\nrecipe.getIngredients(): ",
      ingredientList.map((ingredient) => ingredient.get({ plain: true }))
    ); // []
    message += `<div>
        <h3>recipe.getIngredients():</h3>
        <div class='array'>
        ${
          ingredientList.length > 0
            ? ingredientList.map(
                (ingredient) =>
                  printObject(ingredient.get({ plain: true })) + ","
              )
            : "<div></div>"
        }
        </div>
      </div>`; // [ingredient1, ingredient2]

    // recounts the ingredients
    ingredientCount = await recipe.countIngredients();
    console.log("\n\nrecipe.countIngredients()", ingredientCount); // 2
    message += `<div>
      <h3>await recipe.countIngredients()</h3> 
      <div class="value"> ${ingredientCount}</div>
    <div>`; // 0

    // rechecks if ingredient 1 is in the RECIPE
    ingredientCheck = await recipe.hasIngredient(ingredient1);
    console.log("\n\nrecipe.hasIngredient(ingredient1)", ingredientCheck); // true
    message += `<div>
      <h3>await recipe.hasIngredient(ingredient1)</h3> 
      <div class="value"> ${ingredientCheck}</div>
    <div>`; // false

    // removes ingredient from the recipe.
    await recipe.removeIngredient(ingredient2);
    console.log("\n\nremoved ingredient2");
    message += "\n\nremoved ingredient2";

    ingredientCount = await recipe.countIngredients();
    console.log("\n\nrecipe.countIngredients()", ingredientCount); // 1
    message += "\n\nrecipe.countIngredients()" + ingredientCount; // 1

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
    console.log("removed all ingredients");
    message += "removed all ingredients";

    ingredientCount = await recipe.countIngredients();
    console.log("\n\nrecipe.countIngredients()", ingredientCount); // 0
    message += "\n\nrecipe.countIngredients()" + ingredientCount; // 0

    console.log("\n***************** end *****************\n\n");
    message += "\n***************** end *****************\n\n";
    /* */

    res.render("test", { message: message });
  } catch (err) {
    console.log("\n\n*****************\n", err, "\n*****************\n\n");
    res.status(404).send(err);
  }
});

module.exports = router;
