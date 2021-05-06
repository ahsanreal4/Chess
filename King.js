class King extends Piece {
  allowedMoves = [];
  attackedCells = [];
  kingChecked;
  kingCheckmate;
  allyProtection;
  kingMoved;

  constructor(imgUrl, cellNo, name, id) {
    super(imgUrl, cellNo, name, id);
    this.kingMoved = false;
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
  getCheckmate() {
    return this.kingCheckmate;
  }
  getChecked() {
    return this.kingChecked;
  }
  availableMovesforKing(turn, allyProtection, dontCheckattackedCells) {
    this.allyProtection = allyProtection;
    let color = this.getColor();
    let row;
    this.MoveFunctions = new moveFunctions();
    let clickedCell = this.getCellNo();
    let clickVal;
    var clickedCellrow = clickedCell.substring(0, 1);
    var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
    var clickedCellnum = parseInt(clickedCellnumString);
    let object = null;
    if (color === turn) {
      clickVal = this.MoveFunctions.column(clickedCellrow);

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
      i = clickedCellnum;
      r = clickVal;
    }

    if (dontCheckattackedCells === false) {
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
              this.allowedMoves[
                this.allowedMoves.length - 1
              ] = this.allowedMoves[i];
              this.allowedMoves[i] = temp;
              this.allowedMoves.pop();

              i--;

              break;
            }
          }
        }
      }
    }

    if (this.kingMoved !== true) {
      let ob1, ob2;
      if (this.color === "white") {
        ob1 = this.MoveFunctions.findObjectonCellNo("a8");
        ob2 = this.MoveFunctions.findObjectonCellNo("h8");
      } else {
        ob1 = this.MoveFunctions.findObjectonCellNo("a1");
        ob2 = this.MoveFunctions.findObjectonCellNo("h1");
      }
      if (ob1 !== undefined || ob2 !== undefined) {
        let i = clickedCellnum;
        let r = clickVal;
        let continueFunction = false;
        if (ob1 !== undefined && ob2 !== null) {
          if (ob1.getRookMoved() !== true) {
            for (r = r - 1; r >= 1; r--) {
              row = this.MoveFunctions.row(r);
              if (r === 4) {
                for (let a = 0; a < this.allowedMoves.length; a++) {
                  if (this.allowedMoves[a] === row + i) {
                    continueFunction = true;
                    break;
                  } else if (a === this.allowedMoves.length) {
                    continueFunction = false;
                  }
                }
              }

              if (continueFunction === true) {
                object = this.MoveFunctions.findObjectonCellNo(row + i);

                if (object !== null && r === 1) {
                  row = this.MoveFunctions.row(r + 2);
                  this.allowedMoves.push(row + i);

                  break;
                } else if (object !== null && r !== 1) {
                  break;
                }
              }
            }
          }
        }
        if (ob2 !== undefined && ob2 !== null) {
          if (ob2.getRookMoved() !== true) {
            continueFunction = false;
            i = clickedCellnum;
            r = clickVal;
            for (r = r + 1; r <= 8; r++) {
              row = this.MoveFunctions.row(r);
              if (r === 6) {
                for (let a = 0; a < this.allowedMoves.length; a++) {
                  if (this.allowedMoves[a] === row + i) {
                    continueFunction = true;
                    break;
                  } else if (a === this.allowedMoves.length) {
                    continueFunction = false;
                  }
                }
              }
              if (continueFunction === true) {
                object = this.MoveFunctions.findObjectonCellNo(row + i);

                if (object !== null && r === 8) {
                  row = this.MoveFunctions.row(r - 1);
                  this.allowedMoves.push(row + i);

                  break;
                } else if (object !== null && r !== 8) {
                  break;
                }
              }
            }
          }
        }
      }
    }
    if (dontCheckattackedCells === false) {
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
              this.allowedMoves[
                this.allowedMoves.length - 1
              ] = this.allowedMoves[i];
              this.allowedMoves[i] = temp;
              this.allowedMoves.pop();

              i--;

              break;
            }
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
    } else if (object.getColor() === color) {
      if (this.allyProtection === true) {
        this.allowedMoves.push(row + i);
      }
    }
  }
  allowedMovesforKing(targetCell) {
    if (this.kingMoved !== true) {
      if (
        targetCell === "c8" ||
        targetCell === "g8" ||
        targetCell === "g1" ||
        targetCell === "c1"
      ) {
        if (!this.MoveFunctions.allowedMoves(targetCell, this.allowedMoves)) {
          return false;
        }
        let object = null;
        this.kingMoved = true;
        if (targetCell === "c8") {
          object = this.MoveFunctions.findObjectonCellNo("a8");
          if (object !== null) {
            if (object.rookMoved !== false) return false;
            let img = document.getElementById(object.getCellNo()).firstChild;
            object.setCellNo("d8");
            let square = document.getElementById("d8");
            square.append(img);
            return true;
          }
        } else if (targetCell === "g8") {
          object = this.MoveFunctions.findObjectonCellNo("h8");
          if (object !== null) {
            if (object.rookMoved !== false) return false;
            let img = document.getElementById(object.getCellNo()).firstChild;
            object.setCellNo("f8");
            let square = document.getElementById("f8");
            square.append(img);
            return true;
          }
        } else if (targetCell === "g1") {
          object = this.MoveFunctions.findObjectonCellNo("h1");
          if (object !== null) {
            if (object.rookMoved !== false) return false;
            let img = document.getElementById(object.getCellNo()).firstChild;
            object.setCellNo("f1");
            let square = document.getElementById("f1");
            square.append(img);
            return true;
          }
        } else if (targetCell === "c1") {
          object = this.MoveFunctions.findObjectonCellNo("a1");
          if (object !== null) {
            if (object.rookMoved !== false) return false;
            let img = document.getElementById(object.getCellNo()).firstChild;
            object.setCellNo("d1");
            let square = document.getElementById("d1");
            square.append(img);
            return true;
          }
        }
      }
    }
    if (this.MoveFunctions.allowedMoves(targetCell, this.allowedMoves)) {
      this.kingMoved = true;
      return true;
    }
    return false;
  }
  checkKingCheckmate(whitePieces, blackPieces) {
    const color1 = this.getColor();
    if (color1 === "white") {
      this.checkAttackedCells(blackPieces, "black");
    } else {
      this.checkAttackedCells(whitePieces, "white");
    }
    this.availableMovesforKing(color1, false, false);
    if (this.KingAttackedOrNot()) {
      this.kingChecked = true;
      let color;

      if (this.allowedMoves.length === 0) {
        let checkmate;
        if (color1 === "white") {
          color = "white";
          checkmate = this.checkMoveToPreventCheckmate(
            color,
            board.whitePieces
          );
        } else {
          color = "black";
          checkmate = this.checkMoveToPreventCheckmate(
            color,
            board.blackPieces
          );
        }
        if (checkmate) {
          //this.checkmateSound.play();
          board.checkmate = true;
        } else {
          //  this.checkSound.play();
          //  this.beepSound.play();
          board.check = true;
        }
      } else {
        board.check = true;
        //  this.beepSound.play();
        // this.checkSound.play();
      }
    }
  }
  checkMoveToPreventCheckmate(color, array) {
    let moves;

    for (let i = 0; i < array.length; i++) {
      moves = [];

      let element = array[i];
      element.allowedMoves.length = 0;
      if (element.name === "pawn") {
        element.availableMovesforPawn(color);
        moves.push.apply(moves, element.getAllowedMoves());

        // element.attackingcellsforPawn("white");
        // moves.push.apply(moves, element.getAllowedMoves());
      } else if (element.name === "queen") {
        element.availableMovesforQueen(color, false);
        moves.push.apply(moves, element.getAllowedMoves());
      } else if (element.name === "bishop") {
        element.availableMovesforBishop(color, false);
        moves.push.apply(moves, element.getAllowedMoves());
      } else if (element.name === "knight") {
        element.availableMovesforKnight(color, false);
        moves.push.apply(moves, element.getAllowedMoves());
      } else if (element.name === "rook") {
        element.availableMovesforRook(color, false);
        moves.push.apply(moves, element.getAllowedMoves());
      }

      element.allowedMoves.length = 0;
      if (moves.length !== 0) {
        let temp = element.cellNo;
        if (!this.loopMovesArray(moves, element)) {
          element.cellNo = temp;
          return false;
        }
        element.cellNo = temp;
      }
    }
    return true;
  }

  loopMovesArray(moves, element) {
    let color = element.getColor();
    for (let i = 0; i < moves.length; i++) {
      const object = board.MoveFunctions.findObjectonCellNo(moves[i]);
      if (object !== undefined && object !== null) {
        if (object.getColor() === "black") {
          board.removeObjectfromArray(moves[i], board.blackPieces);
        } else {
          board.removeObjectfromArray(moves[i], board.whitePieces);
        }
      }
      element.cellNo = moves[i];
      if (color === "white") {
        this.checkAttackedCells(board.blackPieces, "black");
      } else {
        this.checkAttackedCells(board.whitePieces, "white");
      }
      if (object !== undefined && object !== null) {
        if (object.getColor() === "black") {
          board.blackPieces.push(object);
        } else {
          board.whitePieces.push(object);
        }
      }
      if (!this.KingAttackedOrNot()) {
        return false;
      }
    }
    return true;
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
        element.availableMovesforQueen(color, true);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      } else if (name === "rook") {
        element.availableMovesforRook(color, true);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      } else if (name === "bishop") {
        element.availableMovesforBishop(color, true);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      } else if (name === "knight") {
        element.availableMovesforKnight(color, true);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves()
        );
      } else if (name === "king") {
        element.availableMovesforKing(color, true);
        this.attackedCells.push.apply(
          this.attackedCells,
          element.getAllowedMoves(),
          true
        );
      }

      element.allowedMoves.length = 0;
    });
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
