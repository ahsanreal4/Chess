class King extends Piece {
  allowedMoves = [];
  attackedCells = [];
  checkSound;
  constructor(imgUrl, cellNo, name, id) {
    super(imgUrl, cellNo, name, id);
    this.checkSound = $("#myAudio2")[0];
    this.checkSound.volume = 0.5;
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
  availableMovesforKing(turn) {
    let color = this.getColor();

    this.MoveFunctions = new moveFunctions();
    let clickedCell = this.getCellNo();
    let clickVal;
    var clickedCellrow = clickedCell.substring(0, 1);
    var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
    var clickedCellnum = parseInt(clickedCellnumString);
    if (color === turn) {
      clickVal = this.MoveFunctions.column(clickedCellrow);
      let object = null;
      let i = clickedCellnum;
      if (i - 1 >= 1) {
        i--;
        this.authorize(clickedCellrow, i, object, color);
      }
      i = clickedCellnum;
      if (i + 1 < 9) {
        i++;
        this.authorize(clickedCellrow, i, object, color);
      }
      i = clickedCellnum;
      let r = clickVal;
      let row;
      if (r + 1 <= 8) {
        row = this.MoveFunctions.row(r + 1);
        this.authorize(row, i, object, color);
        if (i - 1 >= 1) {
          row = this.MoveFunctions.row(r + 1);
          this.authorize(row, i - 1, object, color);
        }
        if (i + 1 < 9) {
          row = this.MoveFunctions.row(r + 1);
          this.authorize(row, i + 1, object, color);
        }
      }
      i = clickedCellnum;
      r = clickVal;
      if (r - 1 >= 1) {
        row = this.MoveFunctions.row(r - 1);
        this.authorize(row, i, object, color);
        if (i - 1 >= 1) {
          row = this.MoveFunctions.row(r - 1);
          this.authorize(row, i - 1, object, color);
        }
        if (i + 1 < 9) {
          row = this.MoveFunctions.row(r - 1);
          this.authorize(row, i + 1, object, color);
        }
      }
    }

    for (let i = 0; i < this.allowedMoves.length; i++) {
      let element = this.allowedMoves[i];
      for (let a = 0; a < this.attackedCells.length; a++) {
        let element2 = this.attackedCells[a];

        if (element === element2) {
          if (i === this.allowedMoves.length - 1) {
            this.allowedMoves.pop();
            break;
          } else {
            let temp = this.allowedMoves[this.allowedMoves.length - 1];
            this.allowedMoves[this.allowedMoves.length - 1] = this.allowedMoves[
              i
            ];
            this.allowedMoves[i] = temp;
            this.allowedMoves.pop();

            i--;

            break;
          }
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
    }
  }
  allowedMovesforKing(targetCell) {
    if (this.MoveFunctions.allowedMoves(targetCell, this.allowedMoves))
      return true;
    return false;
  }
  checkKingCheckmate(whitePieces, blackPieces) {
    if (this.getColor() === "white") {
      this.checkAttackedCells(blackPieces, "black");
    } else {
      this.checkAttackedCells(whitePieces, "white");
    }
  }
  checkAttackedCells(array, color) {
    this.attackedCells.length = 0;
    array.forEach((element) => {
      const name = element.name;
      if (name === "pawn") {
        element.attackingcellsforPawn(color);
        //  console.log(element.getAllowedMoves());
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      } else if (name === "queen") {
        element.availableMovesforQueen(color);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      } else if (name === "rook") {
        element.availableMovesforRook(color);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      } else if (name === "bishop") {
        element.availableMovesforBishop(color);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      } else if (name === "knight") {
        element.availableMovesforKnight(color);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      }
    });
    if (this.KingAttackedOrNot()) {
      this.checkSound.play();
    }
  }
  KingAttackedOrNot() {
    let cellNo = this.getCellNo();
    for (let i = 0; i < this.attackedCells.length; i++) {
      if (this.attackedCells[i] === cellNo) {
        return true;
      }
    }
    return false;
  }
}
