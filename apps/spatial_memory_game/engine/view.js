const CELL_SIZE = 100;
const BOARD_SIZE = 500;

const TEXT_COLOR = "#c73669";
const HIDE_COLOR = "#c9c4b1";
const BOARD_COLOR = "#ebe6d5";
const BORDER_COLOR = "#c08f8f";
const LOSS_COLOR = "#8f3232";
const CLICK_COLOR = "#f7f7d0";

export class View {
  constructor() {
    let gameboard = document.getElementById("gameboard");
    let canvas = gameboard.getContext("2d");
    canvas.font = "50px Clear Sans";
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.fillStyle = "black";
    // document.getElementById(
    //   "gameboard-container"
    // ).style.backgroundColor = BORDER_COLOR;
    this.canvas = canvas;
  }

  update(gameState, over) {
    let score = document.getElementById("score");
    score.textContent = gameState.score;

    if (!over) {
      document.getElementById("gameboard").style.backgroundColor = BOARD_COLOR;
    } else {
      document.getElementById("gameboard").style.backgroundColor = LOSS_COLOR;
    }

    this.canvas.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    this.drawGrid(false);
    this.drawNumbers(gameState);
  }

  hideNumbers() {
    this.canvas.clearRect(0, 0, BOARD_SIZE, BOARD_SIZE);
    this.drawGrid(true);
  }

  drawNumbers(gameState) {
    this.canvas.fillStyle = TEXT_COLOR;
    let index = 0;
    for (let i = CELL_SIZE / 2; i <= BOARD_SIZE; i += CELL_SIZE) {
      for (let j = CELL_SIZE / 2; j <= BOARD_SIZE; j += CELL_SIZE) {
        let num = gameState.board[index];
        if (num != 0) {
          this.canvas.fillText(num, j, i);
        }
        index++;
      }
    }
  }

  drawGrid(bool) {
    if (bool) {
      document.getElementById("gameboard").style.backgroundColor = HIDE_COLOR;
    }
    this.canvas.lineWidth = 8.5;
    this.canvas.strokeStyle = BORDER_COLOR;
    this.canvas.beginPath();
    for (let i = CELL_SIZE; i <= BOARD_SIZE - 1; i += CELL_SIZE) {
      for (let j = CELL_SIZE; j <= BOARD_SIZE - 1; j += CELL_SIZE) {
        this.canvas.moveTo(i, 0);
        this.canvas.lineTo(i, BOARD_SIZE);
        this.canvas.moveTo(0, j);
        this.canvas.lineTo(BOARD_SIZE, j);
      }
    }
    this.canvas.stroke();
  }

  setErrors(bool) {
    let errors = document.getElementById("errors");
    if (bool) {
      errors.textContent += "X";
    } else {
      errors.textContent = "";
    }
  }

  drawCell(x, y) {
    this.canvas.fillStyle = CLICK_COLOR;
    this.canvas.beginPath();
    this.canvas.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    this.canvas.fill();
    this.drawGrid(true);
  }
}
