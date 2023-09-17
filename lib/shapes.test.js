const { Circle, Square, Triangle } = require("./shapes");

describe("Circle", () => {
  test("renders sucessfuly", () => {
    const shape = new Circle();
    var color = "blue";
    shape.setColor(color);
    expect(shape.render()).toEqual(
      `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${color}" />`
    );
  });
});

describe("Triangle", () => {
  test("renders sucessfuly", () => {
    const shape = new Triangle();
    var color = "pink";
    shape.setColor(color);
    expect(shape.render()).toEqual(
      `<polygon points="150, 18 244, 182 56, 182" fill="${color}" />`
    );
  });
});

describe("Square", () => {
  test("renders sucessfuly", () => {
    const shape = new Square();
    var color = "green";
    shape.setColor(color);
    expect(shape.render()).toEqual(
      `<rect x="50" height="200" width="200" fill="${color}" />`
    );
  });
});
