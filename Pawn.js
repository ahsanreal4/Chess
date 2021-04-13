class Pawn extends Piece {
  pawnColor;
  allowedMoves = [];
  constructor(imgUrl, cellNo, name, id, color) {
    super(imgUrl, cellNo, name, id, color);
  }

  row(i) {
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
  }
  undoAllowedMoves() {
    this.allowedMoves.forEach((element) => {
      document.getElementById(element).style.border = "1px solid black";
    });
    this.allowedMoves = [];
  }
  availableMovesforPawn(clickedCell, clickedPiece, turn) {
    //this.allowedMoves.length = 0;
    if (clickedPiece === "w") {
      this.pawnColor = "w";
    } else {
      this.pawnColor = "b";
    }
    let clickVal;
    var clickedCellrow = clickedCell.substring(0, 1);
    var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
    var clickedCellnum = parseInt(clickedCellnumString);
    if (clickedPiece === turn) {
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
      if (this.pawnColor === "w") {
        if (i - 1 >= 1) {
          i--;
          if (!document.getElementById(row + i).hasChildNodes()) {
            this.allowedMoves.push(row + i);
          }
        }
        i = clickedCellnum;
        if (i === 7) {
          i = i - 2;
          if (!document.getElementById(row + i).hasChildNodes()) {
            this.allowedMoves.push(row + i);
            i = i + 1;

            this.allowedMoves.push(row + i);
          }
        }
        r = clickVal;
        i = clickedCellnum;
        if (r === 8) {
          i--;
          row = this.row(r - 1);
          if (document.getElementById(row + i).hasChildNodes()) {
            this.authorize(row, i);
          }
        }
        i = clickedCellnum;
        r = clickVal;
        if (r === 1) {
          i--;
          row = this.row(r + 1);
          if (document.getElementById(row + i).hasChildNodes()) {
            this.authorize(row, i);
          }
        }
        r = clickVal;
        i = clickedCellnum;
        if (r >= 2 && r <= 7) {
          i--;
          row = this.row(r + 1);
          let row2 = this.row(r - 1);
          if (document.getElementById(row + i).hasChildNodes()) {
            this.authorize(row, i);
          }
          if (document.getElementById(row2 + i).hasChildNodes()) {
            this.authorize(row2, i);
          }
        }
      } else {
        if (i + 1 <= 8) {
          i++;
          if (!document.getElementById(row + i).hasChildNodes()) {
            this.allowedMoves.push(row + i);
          }
        }
        i = clickedCellnum;
        if (i === 2) {
          i = i + 2;
          if (!document.getElementById(row + i).hasChildNodes()) {
            this.allowedMoves.push(row + i);
            i = i - 1;

            this.allowedMoves.push(row + i);
          }
        }
        r = clickVal;
        i = clickedCellnum;
        if (r === 8) {
          i++;
          row = this.row(r - 1);
          if (document.getElementById(row + i).hasChildNodes()) {
            this.authorize(row, i);
          }
        }
        i = clickedCellnum;
        r = clickVal;
        if (r === 1) {
          i++;
          row = this.row(r + 1);
          if (document.getElementById(row + i).hasChildNodes()) {
            this.authorize(row, i);
          }
        }
        r = clickVal;
        i = clickedCellnum;
        if (r >= 2 && r <= 7) {
          i++;
          row = this.row(r + 1);
          let row2 = this.row(r - 1);

          if (document.getElementById(row + i).hasChildNodes()) {
            this.authorize(row, i);
          }
          if (document.getElementById(row2 + i).hasChildNodes()) {
            this.authorize(row2, i);
          }
        }
      }
    }
  }
  allowedMovesforPawn(targetCell) {
    for (let i = 0; i < this.allowedMoves.length; i++) {
      if (targetCell === this.allowedMoves[i]) {
        this.undoAllowedMoves();
        this.allowedMoves = [];
        return true;
      }
    }
    return false;
  }
  authorize(clickedCellrow, i) {
    if (document.getElementById(clickedCellrow + i).hasChildNodes()) {
      if (
        document.getElementById(clickedCellrow + i).firstChild.name !==
        this.pawnColor
      ) {
        this.allowedMoves.push(clickedCellrow + i);
      }
    } else {
      this.allowedMoves.push(clickedCellrow + i);
    }
  }
  showColoredMoves() {
    this.allowedMoves.forEach((element) => {
      document.getElementById(element).style.border = "6px solid red";
    });
  }
}
