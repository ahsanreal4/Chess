function movesforBishop() {
  this.bishopColor;
  this.allowedMoves = [];
  this.allowedMovesforBishop = function (
    clickedCell,
    targetCell,
    clickedPiece
  ) {
    for (let i = 0; i < this.allowedMoves.length; i++) {
      if (targetCell === this.allowedMoves[i]) {
        this.undoAllowedMoves();
        this.allowedMoves = [];
        return true;
      }
    }
    return false;
  };
  this.undoAllowedMoves = function () {
    this.allowedMoves.forEach((element) => {
      document.getElementById(element).style.border = "1px solid black";
    });
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
  this.availableMovesforBishop = function (clickedCell, clickedPiece, turn) {
    if (clickedPiece.name === "w") {
      this.bishopColor = "w";
    } else {
      this.bishopColor = "b";
    }
    let clickVal;
    var clickedCellrow = clickedCell.substring(0, 1);
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
      let row;
      var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
      var clickedCellnum = parseInt(clickedCellnumString);

      let i = clickedCellnum;
      let r = clickVal;
      for (r; r < 8; r++) {
        if (i === 1) {
          break;
        } else {
          i--;
        }
        row = this.row(r + 1);

        if (this.authorize(row, i)) {
          break;
        } else {
          document.getElementById(row + i).style.border = "6px solid red";
          this.allowedMoves.push(row + i);
        }
      }
      r = clickVal;
      i = clickedCellnum;
      for (r; r > 1; r--) {
        if (i === 1) {
          break;
        } else {
          i--;
        }
        row = this.row(r - 1);
        if (this.authorize(row, i)) {
          break;
        } else {
          document.getElementById(row + i).style.border = "6px solid red";
          this.allowedMoves.push(row + i);
        }
      }
      r = clickVal;
      i = clickedCellnum;

      for (r; r < 8; r++) {
        if (i === 8) {
          break;
        } else {
          i++;
        }

        row = this.row(r + 1);
        if (this.authorize(row, i)) {
          break;
        } else {
          document.getElementById(row + i).style.border = "6px solid red";
          this.allowedMoves.push(row + i);
        }
      }
      r = clickVal;
      i = clickedCellnum;

      for (r; r > 1; r--) {
        if (i === 8) {
          break;
        } else {
          i++;
        }
        row = this.row(r - 1);
        if (this.authorize(row, i)) {
          break;
        } else {
          document.getElementById(row + i).style.border = "6px solid red";
          this.allowedMoves.push(row + i);
        }
      }
    }
  };
  this.authorize = function (clickedCellrow, i) {
    if (document.getElementById(clickedCellrow + i).hasChildNodes()) {
      if (
        document.getElementById(clickedCellrow + i).firstChild.name !==
        this.bishopColor
      ) {
        document.getElementById(clickedCellrow + i).style.border =
          "6px solid red";
        this.allowedMoves.push(clickedCellrow + i);
      }
      return true;
    } else {
      return false;
    }
  };
}
