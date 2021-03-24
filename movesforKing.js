function movesforKing() {
  this.allowedMoves = [];
  this.kingColor;
  this.undoAllowedMoves = function () {
    this.allowedMoves.forEach((element) => {
      document.getElementById(element).style.border = "1px solid black";
    });
  };
  this.allowedMovesforKing = function (clickedCell, targetCell, clickedPiece) {
    for (let i = 0; i < this.allowedMoves.length; i++) {
      if (targetCell === this.allowedMoves[i]) {
        this.undoAllowedMoves();
        this.allowedMoves = [];
        return true;
      }
    }
    return false;
  };
  this.row = function (i) {
    let row;
    if (i === 1) {
      row = "a";
    } else if (i === 2) {
      row = "b";
    } else if (i === 3) {
      row = "c";
    } else if (i === 4) {
      row = "d";
    } else if (i === 5) {
      row = "e";
    } else if (i === 6) {
      row = "f";
    } else if (i === 7) {
      row = "g";
    } else if (i === 8) {
      row = "h";
    }
    return row;
  };
  this.availableMovesforKing = function (clickedCell, clickedPiece, turn) {
    if (clickedPiece.name === "w") {
      this.kingColor = "w";
    } else {
      this.kingColor = "b";
    }
    let clickVal;
    var clickedCellrow = clickedCell.substring(0, 1);
    var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
    var clickedCellnum = parseInt(clickedCellnumString);
    if (clickedPiece.name === turn) {
      switch (clickedCellrow) {
        case "a":
          clickVal = 1;
          break;

        case "b":
          clickVal = 2;
          break;

        case "c":
          clickVal = 3;
          break;

        case "d":
          clickVal = 4;
          break;

        case "e":
          clickVal = 5;
          break;

        case "f":
          clickVal = 6;
          break;

        case "g":
          clickVal = 7;
          break;
        case "h":
          clickVal = 8;
          break;
        default:
          break;
      }

      let i = clickedCellnum;
      if (i - 1 >= 1) {
        i--;
        this.authorize(clickedCellrow, i);
      }
      i = clickedCellnum;
      if (i + 1 < 9) {
        i++;
        this.authorize(clickedCellrow, i);
      }
      i = clickedCellnum;
      r = clickVal;
      let row;
      if (r + 1 <= 8) {
        row = this.row(r + 1);
        this.authorize(row, i);
        if (i - 1 >= 1) {
          row = this.row(r + 1);
          this.authorize(row, i - 1);
        }
        if (i + 1 < 9) {
          row = this.row(r + 1);
          this.authorize(row, i + 1);
        }
      }
      i = clickedCellnum;
      r = clickVal;
      if (r - 1 >= 1) {
        row = this.row(r - 1);
        this.authorize(row, i);
        if (i - 1 >= 1) {
          row = this.row(r - 1);
          this.authorize(row, i - 1);
        }
        if (i + 1 < 9) {
          row = this.row(r - 1);
          this.authorize(row, i + 1);
        }
      }
    }
  };
  this.authorize = function (clickedCellrow, i) {
    if (document.getElementById(clickedCellrow + i).hasChildNodes()) {
      if (
        document.getElementById(clickedCellrow + i).firstChild.name !==
        this.kingColor
      ) {
        document.getElementById(clickedCellrow + i).style.border =
          "6px solid red";
        this.allowedMoves.push(clickedCellrow + i);
      }
    } else {
      document.getElementById(clickedCellrow + i).style.border =
        "6px solid red";
      this.allowedMoves.push(clickedCellrow + i);
    }
  };
}
