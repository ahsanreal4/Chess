class King extends Piece {
  kingColor;
  allowedMoves = [];
  attackedCells = [];
  constructor(imgUrl, cellNo, name, id, color) {
    super(imgUrl, cellNo, name, id, color);
  }
  undoAllowedMoves() {
    this.allowedMoves.forEach((element) => {
      document.getElementById(element).style.border = "1px solid black";
    });
    this.allowedMoves = [];
  }
  allowedMovesforKing(targetCell) {
    for (let i = 0; i < this.allowedMoves.length; i++) {
      if (targetCell === this.allowedMoves[i]) {
        this.undoAllowedMoves();
        this.allowedMoves = [];
        return true;
      }
    }
    return false;
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
  availableMovesforKing(clickedCell, clickedPiece, turn) {
    if (clickedPiece === "w") {
      this.kingColor = "w";
    } else {
      this.kingColor = "b";
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
      let r = clickVal;
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
  }
  authorize(clickedCellrow, i) {
    if (document.getElementById(clickedCellrow + i).hasChildNodes()) {
      if (
        document.getElementById(clickedCellrow + i).firstChild.name !==
        this.kingColor
      ) {
        this.allowedMoves.push(clickedCellrow + i);
      }
    } else {
      this.allowedMoves.push(clickedCellrow + i);
    }
  }
  showColoredMoves() {
    this.attackedCells = [];
    this.allowedMoves.forEach((element) => {
      document.getElementById(element).style.border = "6px solid red";
    });
  }

  checkAttackedCells(
    whitePieces,
    blackPieces,
    id,
    whitepiecesobjects,
    blackpiecesobjects
  ) {
    if (this.kingColor === "w") {
      blackPieces.forEach((element1) => {
        if (element1.Name === "queen") {
          blackpiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "b");
          });
        } else if (element1.Name === "rook") {
          blackpiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "b");
          });
        } else if (element1.Name === "bishop") {
          blackpiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "b");
          });
        } else if (element1.Name === "knight") {
          blackpiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "b");
          });
        } else if (element1.Name === "pawn") {
          blackpiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "b");
          });
        }
      });
    } else {
      whitePieces.forEach((element1) => {
        if (element1.Name === "queen") {
          whitepiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "w");
          });
        } else if (element1.Name === "rook") {
          whitepiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "w");
          });
        } else if (element1.Name === "bishop") {
          whitepiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "w");
          });
        } else if (element1.Name === "knight") {
          whitepiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "w");
          });
        } else if (element1.Name === "pawn") {
          whitepiecesobjects.forEach((element) => {
            this.checkElements(element, element1, "w");
          });
        }
      });
    }
    //console.log(this.allowedMoves);
    for (let i = 0; i < this.allowedMoves.length; i++) {
      for (let r = 0; r < this.attackedCells.length; r++) {
        let element = this.allowedMoves[i];
        let element2 = this.attackedCells[r];

        if (element === element2) {
          if (i + 1 === this.allowedMoves.length) {
            this.allowedMoves.pop();
            break;
          } else {
            let temp = this.allowedMoves[i];
            this.allowedMoves[i] = this.allowedMoves[
              this.allowedMoves.length - 1
            ];
            this.allowedMoves[this.allowedMoves.length - 1] = temp;
            this.allowedMoves.pop();
            i--;
            break;
          }
        }
      }
    }
    window.onload = function () {
      let board = new Board();
      board.undoAllowedMoves();
    };
  }

  checkElements(element, element1, color) {
    let attackCellarray2 = [];
    if (
      (element instanceof Bishop && element1.Name === "queen") ||
      (element instanceof Bishop && element1.Name === "bishop")
    ) {
      element.allowedMoves.length = 0;
      attackCellarray2 = element.availableMovesforBishop(
        element1.CellNo,
        color,
        color,
        true
      );

      this.attackedCells.push.apply(this.attackedCells, attackCellarray2);
    } else if (
      (element instanceof Rook && element1.Name === "queen") ||
      (element instanceof Rook && element1.Name === "rook")
    ) {
      element.allowedMoves.length = 0;
      attackCellarray2 = element.availabeMovesforRook(
        element1.CellNo,
        color,
        color,
        true
      );

      this.attackedCells.push.apply(this.attackedCells, attackCellarray2);
    } else if (element instanceof Knight && element1.Name === "knight") {
      element.allowedMoves.length = 0;
      attackCellarray2 = element.availableMovesforKnight(
        element1.CellNo,
        color,
        color,
        true
      );
      this.attackedCells.push.apply(this.attackedCells, attackCellarray2);
    } else if (element instanceof Pawn && element1.Name === "pawn") {
      attackCellarray2 = this.attackingcellsforPawn(
        element1.CellNo,
        color,
        color
      );
      this.attackedCells.push.apply(this.attackedCells, attackCellarray2);
    }

    //console.log(this.attackedCells);
  }
  attackingcellsforPawn(clickedCell, clickedPiece, turn) {
    let pawnColor;
    if (clickedPiece === "w") {
      pawnColor = "w";
    } else {
      pawnColor = "b";
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
      if (pawnColor === "w") {
        r = clickVal;
        i = clickedCellnum;
        if (r === 8) {
          i--;
          row = this.row(r - 1);

          this.attackedCells.push(row + i);
        }
        i = clickedCellnum;
        r = clickVal;
        if (r === 1) {
          i--;
          row = this.row(r + 1);

          this.attackedCells.push(row + i);
        }
        r = clickVal;
        i = clickedCellnum;
        if (r >= 2 && r <= 7) {
          i--;
          row = this.row(r + 1);
          let row2 = this.row(r - 1);

          this.attackedCells.push(row + i);
          this.attackedCells.push(row2 + i);
        }
      } else {
        r = clickVal;
        i = clickedCellnum;
        if (r === 8) {
          i++;
          row = this.row(r - 1);

          this.attackedCells.push(row + i);
        }
        i = clickedCellnum;
        r = clickVal;
        if (r === 1) {
          i++;
          row = this.row(r + 1);

          this.attackedCells.push(row + i);
        }
        r = clickVal;
        i = clickedCellnum;
        if (r >= 2 && r <= 7) {
          i++;
          row = this.row(r + 1);
          let row2 = this.row(r - 1);

          this.attackedCells.push(row + i);
          this.attackedCells.push(row2 + i);
        }
      }
    }
  }
}
