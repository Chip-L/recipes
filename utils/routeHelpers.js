/** returns a div of class array */
const printArray = function (arr) {
  printedArr = "<div class='array'>";
  arr.forEach((element) => {
    printedArr += `<div class="arr-element">${printItem(element, true)}</div>`;
  });
  printedArr += "</div>";
  return printedArr;
};

const printObject = function (object) {
  printedObject = "<div class='object'>";
  for (const property in object) {
    printedObject += `<div class="obj-element"><span class="obj-property">${property}</span>: <span>${printItem(
      object[property],
      true
    )}</span></div>`;
  }
  printedObject += "</div>";

  return printedObject;
};

const printItem = function (item, fromObjectOrArray) {
  switch (typeof item) {
    case "function":
      return "[function]";
    case "object":
      if (item === null || item instanceof Date) return item;
      if (Array.isArray(item)) return printArray(item);
      return printObject(item);
    default:
      if (fromObjectOrArray) return item;
      return `<div class='value'>${item}</div>`;
  }
};

const displayValues = function (heading, value) {
  if (heading == `await recipe.getIngredients()`) {
    console.log(`await recipe.getIngredients()`, typeof item);
  }
  return `<div>
  <h3>${heading}</h3>
  ${printItem(value)}
  </div>`;
};
module.exports = { displayValues, printItem, printObject, printArray };
