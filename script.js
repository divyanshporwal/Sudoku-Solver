document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("sudoku-grid");
  
    // Create a 9x9 grid
    for (let row = 0; row < 9; row++) {
      const tr = document.createElement("tr");
      for (let col = 0; col < 9; col++) {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("maxlength", "1");
        td.appendChild(input);
        tr.appendChild(td);
      }
      grid.appendChild(tr);
    }
  });
  
  // Get grid values as a 2D array
  function getGridValues() {
    const grid = [];
    const rows = document.querySelectorAll("#sudoku-grid tr");
  
    rows.forEach((row) => {
      const cols = row.querySelectorAll("input");
      const rowValues = [];
      cols.forEach((cell) => {
        const value = cell.value.trim();
        rowValues.push(value ? value : '.');
      });
      grid.push(rowValues);
    });
  
    return grid;
  }
  
  // Set grid values from a 2D array
  function setGridValues(board) {
    const rows = document.querySelectorAll("#sudoku-grid tr");
  
    rows.forEach((row, rowIndex) => {
      const cols = row.querySelectorAll("input");
      cols.forEach((cell, colIndex) => {
        cell.value = board[rowIndex][colIndex] !== '.' ? board[rowIndex][colIndex] : '';
      });
    });
  }
  
  // Check if placing value at grid[row][col] is safe
  function isSafe(board, row, col, value) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === value || board[i][col] === value) return false;
  
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === value) return false;
    }
    return true;
  }
  
  // Solve the Sudoku puzzle using backtracking
  function solve(board) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '.') {
          for (let value = '1'; value <= '9'; value++) {
            if (isSafe(board, row, col, value)) {
              board[row][col] = value;
  
              if (solve(board)) return true;
  
              board[row][col] = '.'; // Backtrack
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  // Main function to solve Sudoku
  function solveSudoku() {
    const board = getGridValues();
    if (solve(board)) {
      setGridValues(board);
      alert("Sudoku Solved!");
    } else {
      alert("No solution exists for this puzzle.");
    }
  }
  
  // Reset the grid
  function resetGrid() {
    const inputs = document.querySelectorAll("#sudoku-grid input");
    inputs.forEach((input) => (input.value = ""));
  }
  