#!/usr/bin/env node

// Supports addition (+), subtraction (-), multiplication (* or ×), division (/),
// modulo (%), and exponentiation (^).

function validateFiniteNumbers(...numbers) {
  if (!numbers.every(Number.isFinite)) {
    throw new TypeError("operands must be valid finite numbers.");
  }
}

function modulo(a, b) {
  validateFiniteNumbers(a, b);
  if (b === 0) {
    throw new RangeError("modulo by zero is not allowed.");
  }
  return a % b;
}

function power(base, exponent) {
  validateFiniteNumbers(base, exponent);
  return base ** exponent;
}

function squareRoot(n) {
  validateFiniteNumbers(n);
  if (n < 0) {
    throw new RangeError("square root of a negative number is not allowed.");
  }
  return Math.sqrt(n);
}

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
    case "%":
      return modulo(firstNumber, secondNumber);
    case "^":
      return power(firstNumber, secondNumber);
    default:
      throw new Error(`unsupported operation "${operator}".`);
  }
}

module.exports = calculate;
module.exports.modulo = modulo;
module.exports.power = power;
module.exports.squareRoot = squareRoot;

if (require.main === module) {
  const [firstOperand, operatorOrOperand, secondOperand, ...extraArguments] =
    process.argv.slice(2);

  if (firstOperand === "sqrt") {
    if (
      operatorOrOperand === undefined ||
      secondOperand !== undefined ||
      extraArguments.length > 0
    ) {
      console.error("Usage: node src/calculator.js sqrt <number>");
      process.exitCode = 1;
    } else {
      const number = Number(operatorOrOperand);
      if (operatorOrOperand.trim() === "" || !Number.isFinite(number)) {
        console.error("Error: operand must be a valid finite number.");
        process.exitCode = 1;
      } else {
        try {
          console.log(squareRoot(number));
        } catch (error) {
          console.error(`Error: ${error.message}`);
          process.exitCode = 1;
        }
      }
    }
  } else if (
    firstOperand === undefined ||
    operatorOrOperand === undefined ||
    secondOperand === undefined ||
    extraArguments.length > 0
  ) {
    console.error(
      "Usage: node src/calculator.js <number> <+|-|*|×|/|%|^> <number> or",
      "       node src/calculator.js sqrt <number>",
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
        console.log(calculate(firstNumber, operatorOrOperand, secondNumber));
      } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exitCode = 1;
      }
    }
  }
}
