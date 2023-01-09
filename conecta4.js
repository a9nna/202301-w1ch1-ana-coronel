const startButton = document.getElementById("startButton");
const gameInstructions = document.getElementById("gameInstructions");
const pieceColorTurn = document.createElement("p");
const alertsBox = document.createElement("div");
const alertsBoxText = document.createElement("p");
const optionButtons = document.createElement("div");
const restartButton = document.createElement("button");
const exitButton = document.createElement("button");
const board = document.getElementById("board");
const initialArrayBoard = Array.from(
  document.querySelectorAll("div.board> div")
);
const ArrayBoardWithRows = [];
let timer;
let minutes;
let seconds;
let piecesColourChanger = "targetHolesRed";
let cordinateXTarget;
let cordinateYTarget;
let matched = false;

const setGameInformation = () => {
  const gameInformation = document.getElementById("gameInformation");
  const turnInformation = document.createElement("div");
  const boxTitle = document.createElement("div");
  const whichTurn = document.createElement("div");

  gameInformation.style.gridTemplateRows = "2fr 1fr";
  gameInformation.style.margin = "5% 0 5% 0";

  alertsBox.classList.add("alertBox");
  alertsBoxText.innerText = " ";
  turnInformation.classList.add("turn");
  boxTitle.classList.add("boxTitle");
  boxTitle.innerText = "Turno";
  whichTurn.classList.add("whichTurn");
  pieceColorTurn.classList.add("pieceColorRed");

  document.getElementById("gameInformation").appendChild(turnInformation);
  turnInformation.appendChild(boxTitle);
  turnInformation.appendChild(whichTurn);
  whichTurn.appendChild(pieceColorTurn);
  document.getElementById("gameInformation").appendChild(alertsBox);
  alertsBox.appendChild(alertsBoxText);
};
const setOptionButtons = () => {
  optionButtons.classList.add("optionButtons");
  restartButton.classList.add("restart");
  restartButton.innerText = "Reiniciar";
  exitButton.classList.add("exit");
  exitButton.innerText = "Salir";

  document.getElementById("gameInformation").appendChild(optionButtons);
  optionButtons.appendChild(restartButton);
  optionButtons.appendChild(exitButton);
};
const setTheRowsOnTheBoard = (columns, rows) => {
  for (let i = 0; i < rows; i++) {
    let row = initialArrayBoard.slice(0 + columns * i, columns + columns * i);
    ArrayBoardWithRows.push(row);
  }
};
const setStopWatch = (gameTimeInMinutes) => {
  minutes = gameTimeInMinutes - 1;
  seconds = 60;
  timer = setInterval(() => {
    switch (true) {
      case minutes === 0 && seconds === 0:
        timeIsOver();
        break;
      case seconds > 0:
        seconds--;
        break;
      case seconds === 0:
        minutes--;
        seconds = 59;
        break;
    }
    if (seconds < 10) {
      document.getElementById("stopWatch").innerText =
        minutes + " : 0" + seconds;
    } else {
      document.getElementById("stopWatch").innerText =
        minutes + " : " + seconds;
    }
  }, 1000);
};
const colourChanger = () => {
  switch (true) {
    case pieceColorTurn.classList.contains("pieceColorRed"):
      pieceColorTurn.classList.replace("pieceColorRed", "pieceColorBlue");
      piecesColourChanger = "targetHolesBlue";
      break;
    case pieceColorTurn.classList.contains("pieceColorBlue"):
      pieceColorTurn.classList.replace("pieceColorBlue", "pieceColorRed");
      piecesColourChanger = "targetHolesRed";
      break;
  }
};
const checkFullColumn = () => {
  if (
    targetHoleId <= 6 &&
    document.getElementById(targetHoleId).classList.contains("targetHolesRed")
  ) {
    alertsBoxText.innerText = "La columna está llena, por favor, escoja otra";
    return;
  } else if (
    targetHoleId <= 6 &&
    document.getElementById(targetHoleId).classList.contains("targetHolesBlue")
  ) {
    alertsBoxText.innerText = "La columna está llena, por favor, escoja otra";
    return;
  }
};
const checkTarget = (x) => {
  loop1: for (let i = 0; i < ArrayBoardWithRows.length; i++) {
    switch (true) {
      case i === 0:
        if (
          ArrayBoardWithRows[i][x].classList.contains("targetHolesRed") ||
          ArrayBoardWithRows[i][x].classList.contains("targetHolesBlue")
        ) {
          alertsBoxText.innerText =
            "La columna está llena, por favor, escoja otra";
          setTarget(e);
        }
        if (ArrayBoardWithRows[i + 1][x].classList.contains("untargetHoles")) {
          ArrayBoardWithRows[i][x].classList.replace(
            "untargetHoles",
            piecesColourChanger
          );
        } else {
          ArrayBoardWithRows[i][x].classList.replace(
            "untargetHoles",
            piecesColourChanger
          );
          cordinateYTarget = i;
          break loop1;
        }
        break;
      case 0 < i && i < ArrayBoardWithRows.length - 1:
        if (ArrayBoardWithRows[i][x].classList.contains("untargetHoles")) {
          ArrayBoardWithRows[i - 1][x].classList.replace(
            piecesColourChanger,
            "untargetHoles"
          );
          ArrayBoardWithRows[i][x].classList.replace(
            "untargetHoles",
            piecesColourChanger
          );
        }
        if (!ArrayBoardWithRows[i + 1][x].classList.contains("untargetHoles")) {
          cordinateYTarget = i;
          break loop1;
        }
        break;
      case i === ArrayBoardWithRows.length - 1:
        if (ArrayBoardWithRows[i][x].classList.contains("untargetHoles")) {
          ArrayBoardWithRows[i - 1][x].classList.replace(
            piecesColourChanger,
            "untargetHoles"
          );
          ArrayBoardWithRows[i][x].classList.replace(
            "untargetHoles",
            piecesColourChanger
          );
          cordinateYTarget = i;
        }
        break loop1;
    }
  }

  verticalChecker(cordinateXTarget, piecesColourChanger);
  horizontalChecker(cordinateYTarget, piecesColourChanger);
  diagonalLeftChecker(
    cordinateXTarget,
    cordinateYTarget,
    7,
    6,
    piecesColourChanger
  );
  diagonalRightChecker(
    cordinateXTarget,
    cordinateYTarget,
    7,
    6,
    piecesColourChanger
  );

  let tie = 0;
  for (let k = 0; k < ArrayBoardWithRows.length; k++) {
    for (let m = 0; m < ArrayBoardWithRows[k].length; m++) {
      if (!ArrayBoardWithRows[k][m].classList.contains("untargetHoles")) {
        tie++;
      }
    }
  }
  if (tie === 42) {
    alertsBoxText.innerText =
      "Ha sido un empate, pulsa REINICIAR para volver a jugar o SALIR para volver a la pantalla principal";
    board.removeEventListener("click", setTarget);
  }
};
const setTarget = (e) => {
  matched = false;
  alertsBoxText.innerText = " ";
  let targetId = e.target.id;
  if (
    targetId !== "board" &&
    targetId !== "targetHolesRed" &&
    targetId !== "targetHolesBlue"
  ) {
    for (let i = 0; i < ArrayBoardWithRows.length; i++) {
      for (let j = 0; j < ArrayBoardWithRows[i].length; j++) {
        if (ArrayBoardWithRows[i][j].id === targetId) {
          cordinateXTarget = j;
        }
      }
    }
    checkTarget(cordinateXTarget);
    board.removeEventListener("click", setTarget);
    if (!matched) {
      colourChanger();
      cpuTurn = setTimeout(() => {
        let newTarget = Math.floor(Math.random() * (5 - 0 + 1) + 0);
        cordinateXTarget = newTarget;
        checkTarget(cordinateXTarget);
        colourChanger();
        clearTimeout(cpuTurn);
        board.addEventListener("click", setTarget);
      }, 2000);
    }
  }
};
const verticalChecker = (x, colour) => {
  let matchCounter = 0;
  loop1: for (let i = 0; i < ArrayBoardWithRows.length; i++) {
    switch (true) {
      case ArrayBoardWithRows[i][x].classList.contains(colour):
        matchCounter++;
        if (matchCounter === 4) {
          results(colour);
          break loop1;
        }
        break;
      case !ArrayBoardWithRows[i][x].classList.contains(colour):
        matchCounter = 0;
        break;
    }
  }
};
const horizontalChecker = (y, colour) => {
  let matchCounter = 0;
  loop1: for (let i = y; i <= y; i++) {
    for (let j = 0; j < ArrayBoardWithRows[i].length; j++) {
      switch (true) {
        case ArrayBoardWithRows[y][j].classList.contains(colour):
          matchCounter++;
          if (matchCounter === 4) {
            results(colour);
            break loop1;
          }
          break;
        case !ArrayBoardWithRows[y][j].classList.contains(colour):
          matchCounter = 0;
          break;
      }
    }
  }
};
const diagonalLeftChecker = (x, y, columns, rows, colour) => {
  let matchCounter = 0;

  while (y > 0 && x > 0) {
    y--;
    x--;
  }

  loop1: for (let i = 0; i < ArrayBoardWithRows.length; i++) {
    switch (true) {
      case y > rows - 1 || x > columns - 1:
        break;
      case ArrayBoardWithRows[y][x].classList.contains(colour):
        matchCounter++;
        if (matchCounter === 4) {
          results(colour);
          break loop1;
        }
        break;
      case !ArrayBoardWithRows[y][x].classList.contains(colour):
        matchCounter = 0;
        break;
    }
    y++;
    x++;
  }
};
const diagonalRightChecker = (x, y, columns, rows, colour) => {
  let matchCounter = 0;
  while (y > 0 && x < columns - 1) {
    y--;
    x++;
  }
  loop1: for (let i = 0; i < ArrayBoardWithRows.length; i++) {
    switch (true) {
      case y > rows - 1 || x < 0:
        break;
      case ArrayBoardWithRows[y][x].classList.contains(colour):
        matchCounter++;
        if (matchCounter === 4) {
          results(colour);
          break loop1;
        }
        break;
      case !ArrayBoardWithRows[y][x].classList.contains(colour):
        matchCounter = 0;
        break;
    }
    y++;
    x--;
  }
};
const restartButtonActions = () => {
  for (let i = 0; i < ArrayBoardWithRows.length; i++) {
    for (let j = 0; j < ArrayBoardWithRows[i].length; j++) {
      ArrayBoardWithRows[i][j].classList = "untargetHoles";
    }
  }
  pieceColorTurn.classList = "pieceColorRed";
  piecesColourChanger = "targetHolesRed";
  alertsBoxText.innerText = " ";
  clearInterval(timer);
  setStopWatch(1);
  board.addEventListener("click", setTarget);
};
const results = (colour) => {
  matched = true;
  switch (colour) {
    case "targetHolesRed":
      alertsBoxText.innerText =
        "Ha ganado el color rojo, pulsa REINICIAR para volver a jugar o SALIR para volver a la pantalla principal";
      break;
    case "targetHolesBlue":
      alertsBoxText.innerText =
        "Ha ganado el color azul, pulsa REINICIAR para volver a jugar o SALIR para volver a la pantalla principal";
      break;
  }
  clearInterval(timer);
  board.removeEventListener("click", setTarget);
};
const startGame = () => {
  startButton.remove();
  gameInstructions.remove();
  exitButton.addEventListener("click", () => document.location.reload());
  restartButton.addEventListener("click", restartButtonActions);

  setStopWatch(1);
  setGameInformation();
  setOptionButtons();
  setTheRowsOnTheBoard(7, 6);

  board.addEventListener("click", setTarget);
};
const timeIsOver = () => {
  clearInterval(timer);
  alertsBoxText.innerText =
    "SE ACABÓ EL TIEMPO. Ha sido un empate, pulsa REINICIAR para volver a jugar o SALIR para volver a la pantalla principal";
  board.removeEventListener("click", setTarget);
};
startButton.addEventListener("click", startGame);
