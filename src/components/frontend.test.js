const frontend = require("./frontend");

test("properly run frontend", () => {
  expect(frontend("dash")).toBe("string");
});
