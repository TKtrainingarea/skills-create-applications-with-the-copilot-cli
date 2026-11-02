#!/usr/bin/env node

// Supports addition (+), subtraction (-), multiplication (* or ×), and division (/).

function calculate(firstNumber, operator, secondNumber) {
  if (!Number.isFinite(firstNumber) || !Number.isFinite(secondNumber)) {
    throw new TypeError("both operands must be valid finite numbers.");
  }

  switch (operator) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
    case "×":
      return firstNumber * secondNumber;
    case "/":
      if (secondNumber === 0) {
        throw new RangeError("division by zero is not allowed.");
      }
      return firstNumber / secondNumber;
    default:
      throw new Error(`unsupported operation "${operator}".`);
  }
}

module.exports = calculate;

if (require.main === module) {
  const [firstOperand, operator, secondOperand, ...extraArguments] =
    process.argv.slice(2);

  if (
    firstOperand === undefined ||
    operator === undefined ||
    secondOperand === undefined ||
    extraArguments.length > 0
  ) {
    console.error(
      "Usage: node src/calculator.js <number> <+|-|*|×|/> <number>",
    );
    process.exitCode = 1;
  } else {
    const firstNumber = Number(firstOperand);
    const secondNumber = Number(secondOperand);

    if (
      firstOperand.trim() === "" ||
      secondOperand.trim() === "" ||
      !Number.isFinite(firstNumber) ||
      !Number.isFinite(secondNumber)
    ) {
      console.error("Error: both operands must be valid finite numbers.");
      process.exitCode = 1;
    } else {
      try {
        console.log(calculate(firstNumber, operator, secondNumber));
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    }
  }
}
