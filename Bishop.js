class Bishop extends Piece {
  allowedMoves = [];
  MoveFunctions;
  allyProtection;
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
  //ally Protection is used when we have to get the moves when
  //the piece is defending its ally piece.
  availableMovesforBishop(turn, allyProtection) {
    this.allyProtection = allyProtection;
    let color = this.getColor();

    this.MoveFunctions = new moveFunctions();
    let clickedCell = this.getCellNo();
    let clickVal;
    var clickedCellrow = clickedCell.substring(0, 1);
    var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
    var clickedCellnum = parseInt(clickedCellnumString);
    if (color === turn) {
      clickVal = this.MoveFunctions.column(clickedCellrow);
      let row;
      let object = null;
      let i = clickedCellnum;
      let r = clickVal;
      for (r; r < 8; r++) {
        if (i === 1) {
          break;
        } else {
          i--;
        }
        row = this.MoveFunctions.row(r + 1);

        if (this.authorize(row, i, object, color) === true) {
          break;
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
        row = this.MoveFunctions.row(r - 1);
        if (this.authorize(row, i, object, color) === true) {
          break;
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

        row = this.MoveFunctions.row(r + 1);
        if (this.authorize(row, i, object, color) === true) {
          break;
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
        row = this.MoveFunctions.row(r - 1);
        if (this.authorize(row, i, object, color) === true) {
          break;
        }
      }
    }
  }
  allowedMovesforBishop(targetCell) {
    if (this.MoveFunctions.allowedMoves(targetCell, this.allowedMoves))
      return true;
    return false;
  }
  authorize(row, i, object, color) {
    object = this.MoveFunctions.findObjectonCellNo(row + i);
    if (object === null) {
      this.allowedMoves.push(row + i);
      return false;
    } else {
      if (object.getColor() === color) {
        if (this.allyProtection) {
          this.allowedMoves.push(row + i);
        }
        return true;
      } else if (object.getColor() !== color) {
        if (object.getName() === "king") {
          this.allowedMoves.push(row + i);
          return false;
        } else {
          this.allowedMoves.push(row + i);
          return true;
        }
      }
    }
  }
}
