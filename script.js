
// to check if whole array is zero
// if number of zero >= array size (n*n) then whole array is empty.
let countzero = 0;

let defArr = [
  [9, 0, 0, 0, 0, 3, 0, 0, 0],
  [0, 0, 4, 0, 0, 6, 0, 2, 3],
  [0, 2, 8, 0, 0, 5, 1, 9, 0],
  [0, 0, 0, 0, 5, 2, 0, 0, 0],
  [0, 0, 3, 0, 0, 0, 4, 0, 0],
  [0, 5, 0, 0, 0, 0, 3, 0, 0],
  [0, 4, 0, 1, 0, 9, 0, 0, 5],
  [0, 0, 0, 0, 6, 4, 2, 0, 0],
  [0, 6, 9, 0, 0, 0, 0, 0, 0],
];

const Status = document.querySelector('.status1');
const SolvePuzzle = document.getElementById("SolvePuzzle");
const resetBtn = document.getElementById("Reset");
const defaultInputBtn = document.getElementById("default-Input");
const Errorrrr = document.querySelector(".error");
const solved = document.querySelector(".solved");
const defaultValues = document.querySelector(".Default-Values");

let arr = [[], [], [], [], [], [], [], [], []];

SolvePuzzle.addEventListener("click", () => {
  countzero = 0;
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      let num = document.getElementById(i * 9 + j).value;
      if (num) {
        arr[i][j] = parseInt(num);
      } else {
        arr[i][j] = 0;
      }
    }
  }

  if (validInput(arr)) SudokuSolver(0, 0);
  else {
    Status.classList.add('error');
    Status.textContent = `Invalid Input, Reset and Try Again!!!`;

    setTimeout(() => {
      Status.classList.remove('error');
      Status.textContent = ``;
    }, 3000);

    return;
  }
});

resetBtn.addEventListener("click", () => {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      document.getElementById(i * 9 + j).value = "";
    }
  }

  countzero = 0;
});


defaultInputBtn.addEventListener("click", () => {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (defArr[i][j] !== 0) {
        document.getElementById(i * 9 + j).value = defArr[i][j];
      } else document.getElementById(i * 9 + j).value = "";
    }
  }

  Status.classList.add("Default-Values");
  Status.textContent = `Deafult Values`;

  setTimeout(() => {
    Status.classList.remove("Default-Values");
    Status.textContent = ``;
  }, 2000);
});

function validInput(arr) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (isNaN(arr[i][j])) {
        countzero = 0;
        return 0;
      }

      if(arr[i][j] === 0) countzero += 1;
    }
  }

  // console.log(countzero);

  if(countzero >= n*n){
    countzero = 0;
    return 0;
  } 

  return 1;
}

const n = 9;
var board = arr;

function FillBoard(board) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (board[i][j] != 0) {
        document.getElementById(i * 9 + j).value = board[i][j];
      } else document.getElementById(i * 9 + j).value = 0;
    }
  }
}

function check(i, j, val) {
  for (let k = 0; k < n; k++) {
    if (board[i][k] == val || board[k][j] == val) {
      return 0;
    }
  }

  let rn = Math.sqrt(n);
  let basex = i - (i % rn);
  let basey = j - (j % rn);

  for (let delx = basex; delx < basex + rn; delx++) {
    for (let dely = basey; dely < basey + rn; dely++) {
      if (board[delx][dely] == val) {
        return 0;
      }
    }
  }
  return 1;
}

function SudokuSolver(i, j) {
  if (i == n) {
    Status.classList.add('solved');
    Status.textContent = `Solved!!!`;
    
    setTimeout(() => {
      Status.classList.remove("solved");
      Status.textContent = ``;
    }, 2000);

    FillBoard(board);
    return;
  }

  if (board[i][j] == 0) {
    for (let val = 1; val <= n; val++) {
      if (check(i, j, val)) {
        board[i][j] = val;

        if (j == n - 1) {
          SudokuSolver(i + 1, 0);
        } else {
          SudokuSolver(i, j + 1);
        }

        board[i][j] = 0;
      }
    }
  } else {
    if (j == n - 1) {
      SudokuSolver(i + 1, 0);
    } else {
      SudokuSolver(i, j + 1);
    }
  }
}
