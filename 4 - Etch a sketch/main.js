// Get DOM elements
const gridContainer = document.getElementById("grid-container");
const resetButton = document.getElementById("reset");

// Creating a sqaure grid with N rows and columns
let gridSize = 16;

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
    gridContainer.appendChild(square);
  }
}

function resetGrid() {
  console.log("button click");
}

// Initial grid creation
createGrid(gridSize);

resetButton.addEventListener("click", resetGrid);
