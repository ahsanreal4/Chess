class Pawn extends Piece {
  allowedMoves = [];
  MoveFunctions;

  constructor(imgUrl, cellNo, name, id) {
    super(imgUrl, cellNo, name, id);
  }
  getCellNo() {
    return super.getCellNo();
  }
  setCellNo(cellNo) {
    super.setCellNo(cellNo);
  }
  getColor() {
    return super.getColor();
  }
  getName() {
    return super.getName();
  }
  getAllowedMoves() {
    return this.allowedMoves;
  }
  availableMovesforPawn(turn) {
    let color = this.getColor();

    this.MoveFunctions = new moveFunctions();
    let clickedCell = this.getCellNo();
    let clickVal;
    var clickedCellrow = clickedCell.substring(0, 1);
    var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
    var clickedCellnum = parseInt(clickedCellnumString);
    if (color === turn) {
      clickVal = this.MoveFunctions.column(clickedCellrow);
      let i = clickedCellnum;
      let r = clickVal;
      let row;
      let object = null;
      row = this.MoveFunctions.row(r);
      if (color === "white") {
        if (i - 1 >= 1) {
          i--;
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object === null) {
            this.allowedMoves.push(row + i);
          }
        }
        i = clickedCellnum;
        if (i === 7) {
          i = i - 1;
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object === null) {
            this.allowedMoves.push(row + i);
            i = i - 1;
            object = this.MoveFunctions.findObjectonCellNo(row + i);
            if (object === null) {
              this.allowedMoves.push(row + i);
            }
          }
        }

        r = clickVal;
        i = clickedCellnum;
        if (r === 8) {
          i--;
          row = this.MoveFunctions.row(r - 1);
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object !== null) {
            if (object.getColor() !== color) {
              this.allowedMoves.push(row + i);
            }
          }
        }
        i = clickedCellnum;
        r = clickVal;
        if (r === 1) {
          i--;
          row = this.MoveFunctions.row(r + 1);
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object !== null) {
            if (object.getColor() !== color) {
              this.allowedMoves.push(row + i);
            }
          }
        }
        r = clickVal;
        i = clickedCellnum;
        if (r >= 2 && r <= 7) {
          i--;
          row = this.MoveFunctions.row(r + 1);
          let row2 = this.MoveFunctions.row(r - 1);
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object !== null) {
            if (object.getColor() !== color) {
              this.allowedMoves.push(row + i);
            }
          }

          object = this.MoveFunctions.findObjectonCellNo(row2 + i);
          if (object !== null) {
            if (object.getColor() !== color) {
              this.allowedMoves.push(row2 + i);
            }
          }
        }
      } else {
        if (i + 1 <= 8) {
          i++;
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object === null) {
            this.allowedMoves.push(row + i);
          }
        }
        i = clickedCellnum;
        if (i === 2) {
          i = i + 1;
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object === null) {
            this.allowedMoves.push(row + i);
            i = i + 1;
            object = this.MoveFunctions.findObjectonCellNo(row + i);
            if (object === null) {
              this.allowedMoves.push(row + i);
            }
          }
        }
        r = clickVal;
        i = clickedCellnum;
        if (r === 8) {
          i++;
          row = this.MoveFunctions.row(r - 1);
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object !== null) {
            if (object.getColor() !== color) {
              this.allowedMoves.push(row + i);
            }
          }
        }
        i = clickedCellnum;
        r = clickVal;
        if (r === 1) {
          i++;
          row = this.MoveFunctions.row(r + 1);
          object = this.MoveFunctions.findObjectonCellNo(row + i);
          if (object !== null) {
            if (object.getColor() !== color) {
              this.allowedMoves.push(row + i);
            }
          }
        }
        r = clickVal;
        i = clickedCellnum;
        if (r >= 2 && r <= 7) {
          i++;
          row = this.MoveFunctions.row(r + 1);
          let row2 = this.MoveFunctions.row(r - 1);

          object = this.MoveFunctions.findObjectonCellNo(row + i);

          if (object !== null) {
            if (object.getColor() !== color) {
              this.allowedMoves.push(row + i);
            }
          }

          object = this.MoveFunctions.findObjectonCellNo(row2 + i);
          if (object !== null) {
            if (object.getColor() !== color) {
              this.allowedMoves.push(row2 + i);
            }
          }
        }
      }
    }
  }
  allowedMovesforPawn(targetCell) {
    if (this.MoveFunctions.allowedMoves(targetCell, this.allowedMoves))
      return true;
    return false;
  }
  attackingcellsforPawn(turn) {
    this.allowedMoves.length = 0;
    let color = this.getColor();

    this.MoveFunctions = new moveFunctions();
    let clickedCell = this.getCellNo();
    let clickVal;
    var clickedCellrow = clickedCell.substring(0, 1);
    var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
    var clickedCellnum = parseInt(clickedCellnumString);
    if (color === turn) {
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
      row = this.MoveFunctions.row(r);
      if (color === "white") {
        r = clickVal;
        i = clickedCellnum;
        if (r === 8) {
          i--;
          row = this.MoveFunctions.row(r - 1);

          this.allowedMoves.push(row + i);
        }
        i = clickedCellnum;
        r = clickVal;
        if (r === 1) {
          i--;
          row = this.MoveFunctions.row(r + 1);

          this.allowedMoves.push(row + i);
        }
        r = clickVal;
        i = clickedCellnum;
        if (r >= 2 && r <= 7) {
          i--;
          row = this.MoveFunctions.row(r + 1);
          let row2 = this.MoveFunctions.row(r - 1);

          this.allowedMoves.push(row + i);
          this.allowedMoves.push(row2 + i);
        }
      } else {
        r = clickVal;
        i = clickedCellnum;
        if (r === 8) {
          i++;
          row = this.MoveFunctions.row(r - 1);

          this.allowedMoves.push(row + i);
        }
        i = clickedCellnum;
        r = clickVal;
        if (r === 1) {
          i++;
          row = this.MoveFunctions.row(r + 1);

          this.allowedMoves.push(row + i);
        }
        r = clickVal;
        i = clickedCellnum;
        if (r >= 2 && r <= 7) {
          i++;
          row = this.MoveFunctions.row(r + 1);
          let row2 = this.MoveFunctions.row(r - 1);

          this.allowedMoves.push(row + i);
          this.allowedMoves.push(row2 + i);
        }
      }
    }
  }
}
