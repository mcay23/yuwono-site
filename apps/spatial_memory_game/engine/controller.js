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
    this.allowClick = true;

    this.restart_button = document.getElementById("restart");

    let restart = document.getElementById("restart");
    restart.addEventListener(
      "click",
      () => {
        this.restart_button.classList.remove("button-glow");
        this.clicked = false;
        g.setupNewGame();
        v.update(g.getGameState());
        v.setErrors(false);
      },
      false
    );

    let canvas = document.getElementById("gameboard");
    let elemLeft = canvas.offsetLeft + canvas.clientLeft;
    let elemTop = canvas.offsetTop + canvas.clientTop;

    canvas.addEventListener(
      "click",
      (e) => {
        if (this.allowClick) {
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
                if (this.game.isFirst(x_index, y_index)) {
                  this.clicked = true;
                  v.hideNumbers();
                  this.view.drawCell(x_index, y_index);
                  this.game.move(x_index, y_index);
                }
              } else if (!this.game.isClicked(x_index, y_index)) {
                this.view.drawCell(x_index, y_index);
                this.game.move(x_index, y_index);
              }
            }
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
      setTimeout(() => {
        this.game.nextPuzzle();
        this.view.update(this.game.getGameState());
      }, 80);
    }
  };

  processLoss = (status) => {
    this.fail.play();
    this.clicked = false;
    this.view.setErrors(true);
    if (status === "over") {
      this.view.update(this.game.getGameState(), true);
      this.restart_button.classList.add("button-glow");
    } else if (status === "continue") {
      this.clicked = false;
      this.view.update(this.game.getGameState(), true);
      this.game.nextPuzzle();
      this.allowClick = false;
      setTimeout(() => {
        this.view.update(this.game.getGameState(), false);
        this.allowClick = true;
      }, 400);
    }
  };

  getRandomColor() {
    return "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
  }
}
