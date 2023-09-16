const inquirer = require("inquirer");
const fs = require("fs");

const { Square, Triangle, Circle } = require("./lib/shapes.js");

class SvgShapes {
  constructor() {
    this.textElement = "";
    this.shapeElement = "";
  }
  render() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
  }
  setTextElement(text, color) {
    this.textElement = `<text x="150" y="125" font -size="60" fill="${color}">${text}</text>`;
  }
  setShapeElement(typeOfShape) {
    this.shapeElement = typeOfShape.render();
  }
}

const promptQuestions = [
  {
    type: "input",
    name: "text",
    message: "What is the text you want to display?",
  },
  {
    type: "input",
    name: "color",
    message: "what color do u like?",
  },
  {
    type: "list",
    name: "shape",
    message: "choose a shape:",
    choices: ["Square ", "Triangle", "Circle"],
  },
];

function writeToFile(filename, data) {
  console.log("answers:", JSON.stringify(data));
  fileSystem.writeToFile(filename, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Succesfully generated a logo.svg");
  });
}

async function init() {
  console.log("init");
  var svgString = "";
  var svgFile = "logo.svg";

  const answers = await inquirer.prompt(promptQuestions);

  var userText = "";
  if (answers.text.lenght > 0 && answers.text.length < 4) {
    userText = answers.text;
  } else {
    console.error("The length of your input must be between 1-3 characters");
    return;
  }
  console.log("user text: [" + userText + "]");

  userFontColor = answers["text-color"];
  console.log("user font color:[" + userFontColor + "]");

  userShapeColor = answers.shape;
  console.log("user shape color:[" + userShapeColor + "]");

  userShapeType = answers["pixel-image"];
  console.log("user pixel image:[" + userShapeType + "]");

  let userShape;
  if (userShapeType === "Square =" || userShapeType === "square") {
    userShape = new Square();
    console.log("creating square...");
  } else if (userShapeType === "Circle" || userShapeType === "circle") {
    userShape = new Circle();
    console.log("creating circle...");
  } else if (userShapeType === "Triangle" || userShapeType === "triangle") {
    userShape = new Triangle();
    console.log("creating triangle...");
  } else {
    console.log("Invalid shape ");
  }
  userShape.setColor(userShapeColor);

  var svg = new SvgShapes();
  svg.setTextElement(userText, userFontColor);
  svg.setShapeElement(userShape);
  svgString = svg.render();

  console.log("displaying shape:\n\n" + svgString);

  console.log("new shape is gerated");
  console.log("writing new svg shape to file...");
  writeToFile(svgFile);
}
init();
