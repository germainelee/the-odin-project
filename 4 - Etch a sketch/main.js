// Get DOM elements
const gridContainer = document.getElementById("grid-container");
const resetButton = document.getElementById("reset");

// Creating a sqaure grid with N rows and columns
let gridSize = 16;
let isMouseDown = false; // Track if the mouse button is pressed

// Creates grid squares (which is set to `gridSize` when called)
function createGrid(size) {
  gridContainer.innerHTML = "";
  let totalSquares = gridSize * gridSize;
  console.log(
    "num of Row/Column: " + gridSize + "\ntotalSquares: " + totalSquares
  );

  // Each square's size is calculated based on the total width divided by the number of squares per side
  const squareSize = 960 / size;

  for (let i = 0; i < totalSquares; i++) {
    // Create div element and append each square
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Use a single event handler function for mouse events
    square.addEventListener("mouseover", handleMouseEvent);
    square.addEventListener("mousedown", handleMouseEvent);
    square.addEventListener("mouseout", handleMouseEvent);

    gridContainer.appendChild(square);
  }
}

// Track mouse state
gridContainer.addEventListener("mousedown", () => {
  isMouseDown = true;
});

gridContainer.addEventListener("mouseup", () => {
  isMouseDown = false;
});

// Function to generate a random hex color
function getRandomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function handleMouseEvent(event) {
  if (event.type == "mousedown") {
    event.target.style.background = "#" + getRandomColor(); // Color the square on click
  } else if (event.type == "mouseover") {
    // If the square is unstyled (no background color), set it to #e0e0e0
    if (!event.target.style.background) {
      event.target.style.background = "#e0e0e0";
    }
    // If the mouse is down, color the square
    if (isMouseDown) {
      event.target.style.background = "#" + getRandomColor();
    }
  }
  // If the square is unstyled, reset its background
  else if (event.type == "mouseout") {
    // The event.target.style.background property may return the color in RGB format instead of the hex format. checks for both formats to ensure compatibility.
    if (
      event.target.style.background === "rgb(224, 224, 224)" ||
      event.target.style.background === "#e0e0e0"
    ) {
      event.target.style.background = "";
    }
  }
}

// Prompt for new grid size
function resetGrid() {
  console.log("button click");
  let newSize = prompt(
    "Enter the number of squares per side for the new grid (max 100):",
    "8"
  );
  let parsedSize = parseInt(newSize);

  if (parsedSize && parsedSize > 0 && parsedSize <= 100) {
    gridSize = parsedSize;
    createGrid(gridSize);
  } else {
    alert("Please enter a valid number between 1 and 100");
  }
}

// Initial grid creation
createGrid(gridSize);

resetButton.addEventListener("click", resetGrid);
