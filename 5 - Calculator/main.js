// Get DOM elements
const display = document.querySelector('input[name="display"]');
const buttons = document.querySelectorAll('input[type="button"]');

// Add event listeners to all buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => handleButtonClick(button.value));
});

// Function to handle button clicks
function handleButtonClick(value) {
  switch (value) {
    case "AC":
      // Clear the display
      display.value = "";
      break;
    case "DEL":
      // Clear the last character
      display.value = display.value.slice(0, -1);
      break;
    case "=":
      // Evaluate the expression and display the result
      try {
        display.value = evaluateExpression(display.value);
      } catch (error) {
        display.value = "Error";
      }
      break;
    default:
      // Append the clicked button's value to the display
      display.value += value;
  }
}
