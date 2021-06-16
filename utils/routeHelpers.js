module.exports = {
  printObject: function (object) {
    printedObject = "<div class='object'>";
    for (const property in object) {
      if (Array.isArray(object[property])) {
        printedObject += `<p>${property}: [ ${object[property].forEach(
          (element) => element + ", "
        )} ]<\p>`;
      } else if (
        toString
          .call(function () {})
          .split(" ")[1]
          .slice(0, -1) === "Object"
      ) {
        printedObject = "<p>" + property + "</p>";
        printedObject = this.printObject(object[property]);
      } else {
        printedObject += `<p>${property}: ${object[property]}<\p>`;
      }
    }
    printedObject += "</div>";
    return printedObject;
  },
};

/* 
  print item {
    if item is array => print Array
    if item is object => print Object
    else return item
  }

  print array/object {
    returnValue = "[/{"
    for each item/property =>returnValue += print item + "<br />"
    returnValue += "]/}"
  }
*/
