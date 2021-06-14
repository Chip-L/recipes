# Special methods/mixins added to instances

([see original artuicle](https://sequelize.org/master/manual/assocs.html#special-methods-mixins-added-to-instances))

When an association is defined between two models, the instances of those models gain special methods to interact with their associated counterparts.

For example, if we have two models, **_Recipe_** and **_Ingredient_**, and they are associated, their instances will have the following methods/mixins available, depending on the association type:

## Recipe.hasMany(Ingredient)

- `recipe.getIngredients()`
- `recipe.countIngredients()`
- `recipe.hasIngredient()`
- `recipe.hasIngredients()`
- `recipe.setIngredients()`
- `recipe.addIngredient()`
- `recipe.addIngredients()`
- `recipe.removeIngredient()`
- `recipe.removeIngredients()`
- `recipe.createIngredient()`

### Example:

```JavaScript
const recipe = await Recipe.create({ name: 'the-recipe' });
const ingredient1 = await Ingredient.create({ name: 'some-ingredient' });
const ingredient2 = await Ingredient.create({ name: 'another-ingredient' });

console.log(await recipe.getIngredients()); // []
console.log(await recipe.countIngredients()); // 0
console.log(await recipe.hasIngredient(ingredient1)); // false

await recipe.addIngredients([ingredient1, ingredient2]);
console.log(await recipe.countIngredients()); // 2

await recipe.addIngredient(ingredient1); // doesn't actually add because already added
console.log(await recipe.countIngredients()); // 2

console.log(await recipe.hasIngredient(ingredient1)); // true

await recipe.removeIngredient(ingredient2);
console.log(await recipe.countIngredients()); // 1

await recipe.createIngredient({ name: 'yet-another-ingredient' });
console.log(await recipe.countIngredients()); // 2

await recipe.setIngredients([]); // Un-associate all previously associated ingredients
console.log(await recipe.countIngredients()); // 0
```

The getter method accepts options just like the usual finder methods (such as findAll):

```JavaScript
const singleIngredient = await recipe.getIngredients({
  where: {
    name: "some-ingredient"
  }
});
const ingredientNames = (await recipe.getIngredients({
  attributes: ['name'],
  raw: true
})).map(ingredient => ingredient.name);
```

## Recipe.belongsToMany(Ingredient, { through: RecipeIngredient })

The same ones from Recipe.hasMany(Ingredient):

- `recipe.getIngredients()`
- `recipe.countIngredients()`
- `recipe.hasIngredient()`
- `recipe.hasIngredients()`
- `recipe.setIngredients()`
- `recipe.addIngredient()`
- `recipe.addIngredients()`
- `recipe.removeIngredient()`
- `recipe.removeIngredients()`
- `recipe.createIngredient()`

Note: Method names
As shown in the examples above, the names Sequelize gives to these special methods are formed by a prefix (e.g. get, add, set) concatenated with the model name (with the first letter in uppercase). When necessary, the plural is used, such as in recipe.setIngredients(). Again, irregular plurals are also handled automatically by Sequelize. For example, Person becomes People and Hypothesis becomes Hypotheses.

If an alias was defined, it will be used instead of the model name to form the method names. For example:

```JavaScript
Task.hasOne(User, { as: 'Author' });
taskInstance.getAuthor()
taskInstance.setAuthor()
taskInstance.createAuthor()
```
