// const x = "X";
// const circle = "0";
const cells = document.querySelectorAll(".cell");
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const winMsgTextElement = document.querySelector(".msgText");
const winMsgElement = document.querySelector(".winMsg");
const restartBtn = document.querySelector(".restartBtn");
let circleTurn;

const handleClick = (e) => {
  const cell = e.target;

  const currentClass = circleTurn ? "circle" : "x";

  //PLACING MARK
  if (circleTurn) {
    cell.classList.add(currentClass);
    cell.innerText = "0";
  } else {
    cell.classList.add(currentClass);
    cell.innerText = "X";
  }

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    //SWAPING TURN
    circleTurn = !circleTurn;
  }

  //SWAPING TURN
};

const checkWin = (currentClass) => {
  return winCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

const endGame = (draw) => {
  if (draw) {
    winMsgTextElement.innerText = "Draw!";
  } else {
    winMsgTextElement.innerText = `${circleTurn ? "0" : "X"} Wins!`;
  }
  winMsgElement.classList.add("show");
};

const isDraw = () => {
  return [...cells].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

const startGame = () => {
  circleTurn: false;
  cells.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.removeEventListener("click", handleClick);
    cell.innerText = "";
    cell.addEventListener("click", handleClick, { once: true });
  });

  winMsgElement.classList.remove("show");
};
startGame();

restartBtn.addEventListener("click", startGame);
//   const currentClass = circleTurn ? circle : x;
//   cell.innerText = currentClass;
