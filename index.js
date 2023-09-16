const filesystem = require('./node_modules/graceful-fs/graceful-fs')
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
    this.textElement = `<text x="150" y="125" font -size="60" fill="${color}">${text}</text>`;
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
    message: "TEXT COLOR: what text color do u like?",
  },
  {
    type:"input",
    name:'shape',
    message:"SHAPE COLOR : what shape color would you like? "
  },
  {
    type: "list",
    name: "pixel-image",
    message: "choose which Pixel Image would you like?",
    choices: ["Square ", "Triangle", "Circle"],
  },
];

function writeToFile(filename, data) {
  console.log("Writing [" + data + "] to file [" + filename + "]")
  filesystem.writeToFile(filename, data, function (err) {
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
    console.log("The length of your input must be between 1-3 characters");
    return;
  }
  console.log("User text: [" + userText + "]");

  userFontColor = answers["text-color"];
  console.log("User font color:[" + userFontColor + "]");

  userShapeColor = answers.shape;
  console.log("User shape color:[" + userShapeColor + "]");

  userShapeType = answers["pixel-image"];
  console.log("User entered shape = [" + userShapeType + "]");

  let userShape;
  if (userShapeType === "Square =" || userShapeType === "square") {
    userShape = new Square();
    console.log("User selected Square shape");
  } else if (userShapeType === "Circle" || userShapeType === "circle") {
    userShape = new Circle();
    console.log("User selected Circle shape");
  } else if (userShapeType === "Triangle" || userShapeType === "triangle") {
    userShape = new Triangle();
    console.log("User selected Triangle shape");
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
  writeToFile(svgFile, svgString);
}
init();
