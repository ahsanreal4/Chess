class Knight extends Piece {
  allowedMoves = [];
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
  availableMovesforKnight(turn) {
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
      if (r - 1 >= 1) {
        if (i - 2 >= 1) {
          row = this.MoveFunctions.row(r - 1);
          this.authorize(row, i - 2, object, color);
        }
        if (i + 2 <= 8) {
          row = this.MoveFunctions.row(r - 1);
          this.authorize(row, i + 2, object, color);
        }
      }
      if (r + 1 <= 8) {
        if (i - 2 >= 1) {
          row = this.MoveFunctions.row(r + 1);
          this.authorize(row, i - 2, object, color);
        }
        if (i + 2 <= 8) {
          row = this.MoveFunctions.row(r + 1);
          this.authorize(row, i + 2, object, color);
        }
      }
      if (r + 2 <= 8) {
        if (i - 1 >= 1) {
          row = this.MoveFunctions.row(r + 2);
          this.authorize(row, i - 1, object, color);
        }
        if (i + 1 <= 8) {
          row = this.MoveFunctions.row(r + 2);
          this.authorize(row, i + 1, object, color);
        }
      }
      if (r - 2 >= 1) {
        if (i - 1 >= 1) {
          row = this.MoveFunctions.row(r - 2);
          this.authorize(row, i - 1, object, color);
        }
        if (i + 1 <= 8) {
          row = this.MoveFunctions.row(r - 2);
          this.authorize(row, i + 1, object, color);
        }
      }
    }
  }
  authorize(row, i, object, color) {
    object = this.MoveFunctions.findObjectonCellNo(row + i);
    if (object === null) {
      this.allowedMoves.push(row + i);
    } else if (object.getColor() !== color) {
      this.allowedMoves.push(row + i);
      return true;
    }
  }
  allowedMovesforKnight(targetCell) {
    if (this.MoveFunctions.allowedMoves(targetCell, this.allowedMoves))
      return true;
    return false;
  }
}
