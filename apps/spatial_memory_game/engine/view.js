const CELL_SIZE = 100;
const BOARD_SIZE = 500;

const TEXT_COLOR = "#b55c5c";
const BOARD_COLOR = "#dad3b9";
const LOSS_COLOR = "#000066";

export class View {
  constructor() {
    let gameboard = document.getElementById("gameboard");
    let canvas = gameboard.getContext("2d");
    canvas.font = "50px Arial";
    canvas.textAlign = "center";
    canvas.textBaseline = "middle";
    canvas.fillStyle = "black";
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
      document.getElementById("gameboard").style.backgroundColor = TEXT_COLOR;
    }
    this.canvas.lineWidth = 7;
    this.canvas.strokeStyle = "#FFFFFF";
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

  setStatus(message) {
    let status = document.getElementById("status");
    status.textContent = message;
  }

  drawCell(x, y) {
    this.canvas.fillStyle = "#FF0000";
    this.canvas.beginPath();
    this.canvas.rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    this.canvas.fill();
    this.drawGrid(true);
  }
}
