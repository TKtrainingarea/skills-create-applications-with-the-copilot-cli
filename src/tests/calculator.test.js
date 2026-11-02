const assert = require("node:assert/strict");
const test = require("node:test");

const calculate = require("../calculator");

test("adds numbers, including the example from the image", () => {
  assert.equal(calculate(2, "+", 3), 5);
  assert.equal(calculate(-2, "+", 3), 1);
  assert.equal(calculate(1.5, "+", 2.25), 3.75);
});

test("subtracts numbers, including the example from the image", () => {
  assert.equal(calculate(10, "-", 4), 6);
  assert.equal(calculate(4, "-", 10), -6);
  assert.equal(calculate(5.5, "-", 2), 3.5);
});

test("multiplies numbers, including the example from the image", () => {
  assert.equal(calculate(45, "*", 2), 90);
  assert.equal(calculate(45, "×", 2), 90);
  assert.equal(calculate(-3, "*", 4), -12);
  assert.equal(calculate(2.5, "*", 4), 10);
});

test("divides numbers, including the example from the image", () => {
  assert.equal(calculate(20, "/", 5), 4);
  assert.equal(calculate(5, "/", 2), 2.5);
  assert.equal(calculate(-12, "/", 3), -4);
  assert.equal(calculate(0, "/", 5), 0);
});

test("rejects division by positive or negative zero", () => {
  assert.throws(() => calculate(1, "/", 0), {
    name: "RangeError",
    message: "division by zero is not allowed.",
  });
  assert.throws(() => calculate(1, "/", -0), {
    name: "RangeError",
    message: "division by zero is not allowed.",
  });
});

test("rejects unsupported operations", () => {
  assert.throws(() => calculate(1, "^", 2), {
    message: 'unsupported operation "^".',
  });
});

test("rejects non-finite operands", () => {
  for (const invalidOperand of [NaN, Infinity, -Infinity]) {
    assert.throws(() => calculate(invalidOperand, "+", 1), {
      name: "TypeError",
      message: "both operands must be valid finite numbers.",
    });
    assert.throws(() => calculate(1, "+", invalidOperand), {
      name: "TypeError",
      message: "both operands must be valid finite numbers.",
    });
  }
});
