const { RecipeSteps } = require("../models");

const stepData = [
  {
    step: 1,
    description: "Preheat oven to 375° F.",
    recipeId: 1,
  },
  {
    step: 2,
    description:
      "Combine flour, baking soda and salt in small bowl. Beat butter, granulated sugar, brown sugar and vanilla extract in large mixer bowl until creamy. Add eggs, one at a time, beating well after each addition. Gradually beat in flour mixture. Stir in morsels and nuts. Drop by rounded tablespoon onto ungreased baking sheets.",
    recipeId: 1,
  },
  {
    step: 3,
    description:
      "Bake for 9 to 11 minutes or until golden brown. Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.",
    recipeId: 1,
  },
];

const seedRecipeSteps = () => {
  RecipeSteps.bulkCreate(stepData);
};

module.exports = seedRecipeSteps;
