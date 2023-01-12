var arr = [[], [], [], [], [], [], [], [], []];

const SolvePuzzle = document.getElementById("SolvePuzzle");
const resetBtn = document.getElementById("Reset");
const defaultInputBtn = document.getElementById("default-Input");
const Errorrrr = document.querySelector(".error");
const solved = document.querySelector(".solved");
const defaultValues = document.querySelector(".Default-Values");

SolvePuzzle.addEventListener("click", () => {
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

  let flag = 1;

  // if (arr[0][0] === 0 || (arr[0][0] >= 1 && arr[0][0] <= 9)) {
  //   flag = 1;
  // } else {
  //   // for (let i = 0; i < n; i++) {
  //   //   for (let j = 0; j < n; j++) {
  //   //     if (arr[i][j] !== 0) {
  //   //       if (validInput(arr, arr[i][j], i, j) === 0) {
  //   //         flag = 0;
  //   //         break;
  //   //       }
  //   //     }
  //   //   }
  //   // }
  // }

  if (flag) SudokuSolver(0, 0);
  else {
    Errorrrr.innerHTML = `Invalid Input, Reset and Try Again!!!`;

    setTimeout(() => {
      Errorrrr.innerHTML = ``;
    }, 3000);
    // console.log("Invalid Input");
    return;
  }
});

resetBtn.addEventListener("click", () => {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      document.getElementById(i * 9 + j).value = "";
    }
  }
});

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

defaultInputBtn.addEventListener("click", () => {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (defArr[i][j] !== 0) {
        document.getElementById(i * 9 + j).value = defArr[i][j];
      } else document.getElementById(i * 9 + j).value = 0;
    }
  }

  defaultValues.innerHTML = `Deafult Values`;

  setTimeout(() => {
    defaultValues.innerHTML = ``;
  }, 3000);
});

function validInput(arr, val, x, y) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      // for (let k = 0; k < n; k++) {
      //   if (x !== i && y !== k) {
      //     if (arr[i][k] === val || arr[k][j] === val) {
      //       return 0;
      //     }
      //   }
      // }

      // console.log('sdfsedgf1');

      // let rn = Math.sqrt(n);
      // let basex = i - (i % rn);
      // let basey = j - (j % rn);

      // for (let delx = basex; delx < basex + rn; delx++) {
      //   for (let dely = basey; dely < basey + rn; dely++) {
      //     if (arr[delx][dely] === val) {
      //       return 0;
      //     }
      //   }
      // }

      // console.log("sdfsedgf2");
      return 1;
    }
  }
}

// $(document).ready(function () {
//   $("input").keyup(function (e) {
//     if (e.which == 39) $(this).closest("td").next().find("input").focus();
//     else if (e.which == 37) $(this).closest("td").prev().find("input").focus();
//     else if (e.which == 40)
//       $(this)
//         .closest("tr")
//         .next()
//         .find("td:eq(" + $(this).closest("td").index() + ")")
//         .find("input")
//         .focus();
//     else if (e.which == 38)
//       $(this)
//         .closest("tr")
//         .prev()
//         .find("td:eq(" + $(this).closest("td").index() + ")")
//         .find("input")
//         .focus();
//   });
// });

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

// row check
// column check
// subgrid check
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
    solved.innerHTML = `Solved!!!`;
    setTimeout(() => {
      solved.innerHTML = ``;
    }, 3000);

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
