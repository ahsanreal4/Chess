class Rook extends Piece {
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
  availableMovesforRook(turn) {
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
      let object = null;
      let row;
      row = this.MoveFunctions.row(r);
      for (i = i - 1; i >= 1; i--) {
        if (this.authorize(row, i, object, color)) {
          break;
        }
      }
      i = clickedCellnum;
      for (i = i + 1; i <= 8; i++) {
        if (this.authorize(row, i, object, color)) {
          break;
        }
      }
      r = clickVal;
      i = clickedCellnum;
      for (r = r + 1; r <= 8; r++) {
        row = this.MoveFunctions.row(r);
        if (this.authorize(row, i, object, color)) {
          break;
        }
      }
      r = clickVal;
      i = clickedCellnum;
      for (r = r - 1; r >= 1; r--) {
        row = this.MoveFunctions.row(r);
        if (this.authorize(row, i, object, color)) {
          break;
        }
      }
    }
  }
  authorize(row, i, object, color) {
    object = this.MoveFunctions.findObjectonCellNo(row + i);
    if (object === null) {
      this.allowedMoves.push(row + i);
      return false;
    } else {
      if (object.getColor() === color) {
        return true;
      } else {
        this.allowedMoves.push(row + i);
        return true;
      }
    }
  }
  allowedMovesforRook(targetCell) {
    if (this.MoveFunctions.allowedMoves(targetCell, this.allowedMoves))
      return true;
    return false;
  }
}
