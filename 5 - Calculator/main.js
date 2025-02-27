// Basic math operation functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Division by zero";
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    return "Error: Modulo by zero";
  }
  return a % b;
}

// Operate function to perform calculations
function operate(operator, a, b) {
  a = Number.parseFloat(a);
  b = Number.parseFloat(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "–":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    case "%":
      return modulo(a, b);
    default:
      return "Error: Invalid operator";
  }
}

// Variables to store calculator state
let firstNumber = "";
let operator = "";
let secondNumber = "";
let shouldResetDisplay = false;
let calculationComplete = false;

// Get DOM elements
const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');

// Initialize display
display.value = "0";

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;

    // Handle different button types
    if ((value >= "0" && value <= "9") || value === "00" || value === ".") {
      handleNumberInput(value);
    } else if (
      value === "+" ||
      value === "–" ||
      value === "×" ||
      value === "÷" ||
      value === "%"
    ) {
      handleOperatorInput(value);
    } else if (value === "=") {
      handleEqualsInput();
    } else if (value === "AC") {
      clearCalculator();
    } else if (value === "DEL") {
      handleDelete();
    }
  });
});

// Function to handle button clicks
function handleNumberInput(value) {
  // If a calculation was just completed, start fresh
  if (calculationComplete) {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    calculationComplete = false;
  }

  // If display should be reset (after operator input), clear it
  if (shouldResetDisplay) {
    display.value = "";
    shouldResetDisplay = false;
  }

  // Handle decimal point logic
  if (value === "." && display.value.includes(".")) {
    return; // Prevent multiple decimal points
  }

  // Handle initial zero
  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }

  // Update the appropriate number variable
  updateNumber(display.value);
}

// Handle operator button clicks
function handleOperatorInput(value) {
  // If we already have both numbers and an operator, calculate the result first
  if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
    handleEqualsInput();
  }

  // Set the operator
  operator = value;

  // If first number is still empty, set it to 0
  if (firstNumber === "") {
    firstNumber = "0";
  }

  shouldResetDisplay = true;
  calculationComplete = false;
}

// Handle equals button click
function handleEqualsInput() {
  // If we don't have all the necessary parts, do nothing
  if (firstNumber === "" || operator === "") {
    return;
  }

  // If second number is empty, use the first number
  if (secondNumber === "") {
    secondNumber = firstNumber;
  }

  // Calculate the result
  const result = operate(operator, firstNumber, secondNumber);

  // Check if result is an error message
  if (typeof result === "string" && result.includes("Error")) {
    display.value = result;
    clearCalculator(); // Reset state on error
    return;
  }

  // Round long decimals to prevent overflow
  const roundedResult = roundResult(result);
  display.value = roundedResult;
  firstNumber = roundedResult.toString();

  // Reset for next calculation
  operator = "";
  secondNumber = "";
  shouldResetDisplay = true;
  calculationComplete = true;
}

// Round results with long decimals
function roundResult(number) {
  // Convert to number in case it's a string
  number = Number.parseFloat(number);

  // Check if it's a whole number
  if (Number.isInteger(number)) {
    return number;
  }

  // Round to 8 decimal places to prevent display overflow
  return Math.round(number * 100000000) / 100000000;
}

// Clear calculator state
function clearCalculator() {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  display.value = "0";
  shouldResetDisplay = false;
  calculationComplete = false;
}

// Handle delete button click
function handleDelete() {
  // If a calculation was just completed, clear everything
  if (calculationComplete) {
    clearCalculator();
    return;
  }

  // Remove the last character
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = "0";
  }

  // Update the appropriate number variable
  updateNumber(display.value);
}

// Helper function to update firstNumber or secondNumber
function updateNumber(value) {
  if (operator === "") {
    firstNumber = value;
  } else {
    secondNumber = value;
  }
}
