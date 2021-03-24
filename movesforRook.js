function movesforRook() {
  this.rookColor;
  this.allowedMoves = [];
  this.undoAllowedMoves = function () {
    this.allowedMoves.forEach((element) => {
      document.getElementById(element).style.border = "1px solid black";
    });
  };
  this.availableMovesforRook = function (clickedCell, clickedPiece, turn) {
    if (clickedPiece.name === "w") {
      this.rookColor = "w";
    } else {
      this.rookColor = "b";
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
      let r = clickVal;
      let row;
      row = this.row(r);
      for (i = i - 1; i >= 1; i--) {
        if (this.authorize(row, i)) {
          break;
        }
      }
      i = clickedCellnum;
      for (i = i + 1; i <= 8; i++) {
        if (this.authorize(row, i)) {
          break;
        }
      }
      r = clickVal;
      i = clickedCellnum;
      for (r = r + 1; r <= 8; r++) {
        row = this.row(r);
        if (this.authorize(row, i)) {
          break;
        }
      }
      r = clickVal;
      i = clickedCellnum;
      for (r = r - 1; r >= 1; r--) {
        row = this.row(r);
        if (this.authorize(row, i)) {
          break;
        }
      }
    }
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
  this.allowedMovesforRook = function (clickedCell, targetCell, clickedPiece) {
    for (let i = 0; i < this.allowedMoves.length; i++) {
      if (targetCell === this.allowedMoves[i]) {
        this.undoAllowedMoves();
        this.allowedMoves = [];
        return true;
      }
    }
    return false;
  };
  this.authorize = function (clickedCellrow, i) {
    if (document.getElementById(clickedCellrow + i).hasChildNodes()) {
      if (
        document.getElementById(clickedCellrow + i).firstChild.name !==
        this.rookColor
      ) {
        document.getElementById(clickedCellrow + i).style.border =
          "6px solid red";
        this.allowedMoves.push(clickedCellrow + i);
      }
      return true;
    } else {
      document.getElementById(clickedCellrow + i).style.border =
        "6px solid red";
      this.allowedMoves.push(clickedCellrow + i);
      return false;
    }
  };
}
