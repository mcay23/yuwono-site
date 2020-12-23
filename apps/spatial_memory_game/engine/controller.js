const CELL_SIZE = 100;

export class Controller {
  constructor(g, v) {
    this.game = g;
    this.view = v;

    this.view.update(g.getGameState());
    this.game.onMove(this.processMove);
    this.game.onLose(this.processLoss);

    this.correct = new Audio("assets/correct.mp3");
    this.success = new Audio("assets/next.mp3");
    this.fail = new Audio("assets/fail.mp3");

    this.clicked = false;

    let restart = document.getElementById("restart");
    restart.addEventListener(
      "click",
      () => {
        this.clicked = false;
        g.setupNewGame();
        v.update(g.getGameState());
        v.setStatus("Started");
      },
      false
    );

    let canvas = document.getElementById("gameboard");
    let elemLeft = canvas.offsetLeft + canvas.clientLeft;
    let elemTop = canvas.offsetTop + canvas.clientTop;

    canvas.addEventListener(
      "click",
      (e) => {
        if (this.game.gameState.over) {
          // this.clicked = false;
          // g.setupNewGame();
          // v.update(g.getGameState());
          // v.setStatus("Started");
        } else {
          let x = e.pageX - elemLeft;
          let y = e.pageY - elemTop;
          if (x <= 500 && y <= 500 && x >= 0 && y >= 0) {
            let x_index = Math.floor(x / CELL_SIZE);
            let y_index = Math.floor(y / CELL_SIZE);
            if (!this.clicked) {
              this.clicked = true;
              v.drawGrid(true);
            }
            this.view.drawCell(x_index, y_index);
            this.game.move(x_index, y_index);
          }
        }
      },
      false
    );
  }

  processMove = (status) => {
    if (status === "correct") {
      this.correct.play();
      // move correct
      this.next += 1;
    } else if (status == "next") {
      this.success.play();
      this.clicked = false;
      this.game.nextPuzzle();
      this.view.update(this.game.getGameState());
    }
  };

  processLoss = () => {
    this.fail.play();
    this.clicked = false;
    this.view.update(this.game.getGameState(), true);
    this.view.setStatus("Game Over!");
  };
}
