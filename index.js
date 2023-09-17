const fs = require("fs");
const inquirer = require("inquirer");
const { Square, Triangle, Circle } = require("./lib/shapes");

class SvgShapes {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }
  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }
  setTextElement(text, color) {
    this.textElement = `<text x="150" y="130" text-anchor="middle" font-size="60" fill="${color}">${text}</text>`;
  }
  setShapeElement(Shape) {
    this.shapeElement = Shape.render();
  }
}

const promptQuestions = [
  {
    type: "input",
    name: "text",
    message: "TEXT: Enter up to (3) Characters:",
  },
  {
    type: "input",
    name: "text-color",
    message: "TEXT COLOR: What text color do you like?",
  },
  {
    type: "input",
    name: "shape-color",
    message: "SHAPE COLOR: What shape color would you like?",
  },
  {
    type: "list",
    name: "pixel-image",
    message: "Choose which Pixel Image you would like?",
    choices: ["Square", "Triangle", "Circle"],
  },
];

function writeToFile(filename, data) {
  console.log(`Writing [${data}] to file [${filename}]`);
  fs.writeFile(filename, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Successfully generated a logo.svg");
  });
}

async function init() {
  console.log("init");
  const svgFile = "logo.svg";

  const answers = await inquirer.prompt(promptQuestions);

  const userText = answers.text;
  if (userText.length < 1 || userText.length > 3) {
    console.log("The length of your input must be between 1-3 characters");
    return;
  }
  console.log(`User text: [${userText}]`);

  const userFontColor = answers["text-color"];
  console.log(`User font color: [${userFontColor}]`);

  const userShapeColor = answers["shape-color"];
  console.log(`User shape color: [${userShapeColor}]`);

  const userShapeType = answers["pixel-image"];
  console.log(`User entered shape: [${userShapeType}]`);

  let userShape;
  if (userShapeType.toLowerCase() === "square") {
    userShape = new Square();
    console.log("User selected Square shape");
  } else if (userShapeType.toLowerCase() === "circle") {
    userShape = new Circle();
    console.log("User selected Circle shape");
  } else if (userShapeType.toLowerCase() === "triangle") {
    userShape = new Triangle();
    console.log("User selected Triangle shape");
  } else {
    console.log("Invalid shape");
    return;
  }
  userShape.setColor(userShapeColor);

  const svg = new SvgShapes();
  svg.setTextElement(userText, userFontColor);
  svg.setShapeElement(userShape);
  const svgString = svg.render();

  console.log("Displaying shape:\n\n" + svgString);

  console.log("New shape is generated");
  console.log("Writing new svg shape to file...");
  writeToFile(svgFile, svgString);
}

init();
