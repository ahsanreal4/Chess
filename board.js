function Board() {
  let moveSound = document.getElementById("myAudio");
  this.elements = [];
  let pawn, queen, rook, knight, bishop, king;
  this.blackpiecesobjects = [];
  this.whitepiecesobjects = [];

  let turn;
  this.whitePieces = [];
  this.blackPieces = [];
  let gameOver = false;
  this.startClock = function () {
    let blackCounter = document.getElementById("White_Clock");
    let whiteCounter = document.getElementById("Black_Clock");
    let whiteminutes = 4;
    let whitesecs = 60;
    let blackmins = 4;
    let blacksecs = 60;

    let interval = setInterval(() => {
      if (document.getElementById("Turn").textContent === "White's Turn") {
        turn = "w";
      } else {
        turn = "b";
      }
      if (turn === "w") {
        if (whitesecs === 0) {
          if (whiteminutes >= 2) {
            whiteminutes--;
          } else {
            whiteminutes--;
            clearInterval(interval);
          }
          if (whiteminutes !== 0) {
            whitesecs = 59;
          } else {
            whitesecs = 0;
            gameOver = true;
            this.showGameOver();
          }
        } else {
          whitesecs--;
        }
        whiteCounter.textContent = whiteminutes + ": " + whitesecs;
      } else {
        if (blacksecs === 0) {
          if (blackmins >= 2) {
            blackmins--;
          } else {
            blackmins--;
            clearInterval(interval);
          }
          if (blackmins !== 0) {
            blacksecs = 59;
          } else {
            blacksecs = 0;
            gameOver = true;
            this.showGameOver();
          }
        } else {
          blacksecs--;
        }
        blackCounter.textContent = blackmins + ": " + blacksecs;
      }
    }, 1000);
  };
  this.showGameOver = function () {
    document.getElementById("over").style.display = "block";
  };
  this.addPiecestoArray = function () {
    this.whitePieces.push({ Name: "queen", CellNo: "d8" });
    this.whitePieces.push({ Name: "bishop", CellNo: "c8" });
    this.whitePieces.push({ Name: "bishop", CellNo: "f8" });
    this.whitePieces.push({ Name: "rook", CellNo: "a8" });
    this.whitePieces.push({ Name: "rook", CellNo: "h8" });
    this.whitePieces.push({ Name: "knight", CellNo: "b8" });
    this.whitePieces.push({ Name: "knight", CellNo: "g8" });
    this.whitePieces.push({ Name: "king", CellNo: "e8" });
    this.whitePieces.push({ Name: "pawn", CellNo: "a7" });
    this.whitePieces.push({ Name: "pawn", CellNo: "b7" });
    this.whitePieces.push({ Name: "pawn", CellNo: "c7" });
    this.whitePieces.push({ Name: "pawn", CellNo: "d7" });
    this.whitePieces.push({ Name: "pawn", CellNo: "e7" });
    this.whitePieces.push({ Name: "pawn", CellNo: "f7" });
    this.whitePieces.push({ Name: "pawn", CellNo: "g7" });
    this.whitePieces.push({ Name: "pawn", CellNo: "h7" });

    //Black Pieces
    this.blackPieces.push({ Name: "queen", CellNo: "d1" });
    this.blackPieces.push({ Name: "bishop", CellNo: "f1" });
    this.blackPieces.push({ Name: "bishop", CellNo: "c1" });
    this.blackPieces.push({ Name: "knight", CellNo: "b1" });
    this.blackPieces.push({ Name: "knight", CellNo: "g1" });
    this.blackPieces.push({ Name: "rook", CellNo: "a1" });
    this.blackPieces.push({ Name: "rook", CellNo: "h1" });
    this.blackPieces.push({ Name: "king", CellNo: "e1" });
    this.blackPieces.push({ Name: "pawn", CellNo: "a2" });
    this.blackPieces.push({ Name: "pawn", CellNo: "b2" });
    this.blackPieces.push({ Name: "pawn", CellNo: "c2" });
    this.blackPieces.push({ Name: "pawn", CellNo: "d2" });
    this.blackPieces.push({ Name: "pawn", CellNo: "e2" });
    this.blackPieces.push({ Name: "pawn", CellNo: "f2" });
    this.blackPieces.push({ Name: "pawn", CellNo: "g2" });
    this.blackPieces.push({ Name: "pawn", CellNo: "h2" });
  };

  this.removePiecefromArray = function (newPiece) {
    if (newPiece.name === "w") {
      this.whitePieces.forEach((element, index) => {
        if (element.CellNo === newPiece.parentElement.id) {
          if (index + 1 === this.whitePieces.length) {
            this.whitePieces.pop();
          } else {
            let temp = this.whitePieces[index];
            this.whitePieces[index] = this.whitePieces[
              this.whitePieces.length - 1
            ];
            this.whitePieces[this.whitePieces.length - 1] = temp;
            this.whitePieces.pop();
          }
        }
      });
    } else {
      this.blackPieces.forEach((element, index) => {
        if (element.CellNo === newPiece.parentElement.id) {
          if (index + 1 === this.blackPieces.length) {
            this.blackPieces.pop();
          } else {
            let temp = this.blackPieces[index];
            this.blackPieces[index] = this.blackPieces[
              this.blackPieces.length - 1
            ];
            this.blackPieces[this.blackPieces.length - 1] = temp;
            this.blackPieces.pop();
          }
        }
      });
    }
  };
  this.updatePiecesArray = function (cellNo, prevCell) {
    if (turn === "w") {
      this.whitePieces.forEach((element) => {
        if (element.CellNo === prevCell) {
          element.CellNo = cellNo;
          return;
        }
      });
    } else {
      this.blackPieces.forEach((element) => {
        if (element.CellNo === prevCell) {
          element.CellNo = cellNo;
          return;
        }
      });
    }
  };

  this.drawPieces = function () {
    queen = new Queen(
      "Pieces/white/straight/queen.svg",
      "d8",
      "w",
      "q",
      "white"
    );

    this.whitepiecesobjects.push(queen);
    rook = new Rook("Pieces/white/straight/rook.svg", "a8", "w", "r", "white");

    knight = new Knight(
      "Pieces/white/straight/knight.svg",
      "b8",
      "w",
      "k",
      "white"
    );

    knight = new Knight(
      "Pieces/white/straight/knight.svg",
      "g8",
      "w",
      "k",
      "white"
    );
    this.whitepiecesobjects.push(knight);

    bishop = new Bishop(
      "Pieces/white/straight/bishop.svg",
      "c8",
      "w",
      "b",
      "white"
    );

    bishop = new Bishop(
      "Pieces/white/straight/bishop.svg",
      "f8",
      "w",
      "b",
      "white"
    );
    this.whitepiecesobjects.push(bishop);

    king = new King("Pieces/white/straight/king.svg", "e8", "w", "kg", "white");
    this.whitepiecesobjects.push(king);

    rook = new Rook("Pieces/white/straight/rook.svg", "h8", "w", "r", "white");
    this.whitepiecesobjects.push(rook);

    for (let i = 1; i <= 8; i++) {
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

      pawn = new Pawn(
        "Pieces/white/straight/pawn.svg",
        row + 7,
        "w",
        "p",
        "white"
      );
      if (i === 1) {
        this.whitepiecesobjects.push(pawn);
      }

      pawn = new Pawn(
        "Pieces/black/inverse/pawn.svg",
        row + 2,
        "b",
        "p",
        "black"
      );
      if (i === 1) {
        this.blackpiecesobjects.push(pawn);
      }
    }
    rook = new Rook("Pieces/black/inverse/rook.svg", "a1", "b", "r", "black");
    this.blackpiecesobjects.push(rook);

    rook = new Rook("Pieces/black/inverse/rook.svg", "h1", "b", "r", "black");

    king = new King("Pieces/black/inverse/king.svg", "e1", "b", "kg", "black");
    this.blackpiecesobjects.push(king);

    knight = new Knight(
      "Pieces/black/inverse/knight.svg",
      "b1",
      "b",
      "k",
      "black"
    );

    knight = new Knight(
      "Pieces/black/inverse/knight.svg",
      "g1",
      "b",
      "k",
      "black"
    );
    this.blackpiecesobjects.push(knight);

    bishop = new Bishop(
      "Pieces/black/inverse/bishop.svg",
      "c1",
      "b",
      "b",
      "black"
    );

    bishop = new Bishop(
      "Pieces/black/inverse/bishop.svg",
      "f1",
      "b",
      "b",
      "black"
    );
    this.blackpiecesobjects.push(bishop);

    queen = new Queen(
      "Pieces/black/inverse/queen.svg",
      "d1",
      "b",
      "q",
      "black"
    );
    this.blackpiecesobjects.push(queen);

    let clickedPiece, prevPiece;
    let allowMove = false;
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener("click", function (e) {
        if (gameOver === false) {
          let cell = e.target;

          if (cell.nodeName === "IMG" || cell.hasChildNodes()) {
            if (cell.nodeName === "IMG") {
              clickedPiece = board.pieceClicked(cell, e);
              if (clickedPiece !== undefined) {
                prevPiece = clickedPiece;
              } else {
                clickedPiece = prevPiece;
              }
            } else {
              board.pieceClicked(cell.firstChild, e);
            }
          } else {
            if (
              pawn.allowedMoves.length !== 0 ||
              bishop.allowedMoves.length !== 0 ||
              rook.allowedMoves.length !== 0 ||
              queen.allowedMoves.length !== 0 ||
              king.allowedMoves.length !== 0 ||
              knight.allowedMoves.length !== 0
            ) {
              board.cellClicked(clickedPiece, allowMove, e);
            }
          }
        }
      });
    }
    document.body.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    document.body.addEventListener("mousemove", function (e) {
      e.preventDefault();
    });
  };
  let NclickedPiece;
  let allowCapture = false;
  this.pieceClicked = function (cell, e) {
    if (cell.name === turn) {
      if (cell.id === "p") {
        pawn.availableMovesforPawn(
          cell.parentElement.id,
          cell.name,
          turn,
          false
        );

        if (pawn.allowedMoves.length !== 0) {
          this.undoAllowedMoves();
          pawn.availableMovesforPawn(
            cell.parentElement.id,
            cell.name,
            turn,
            false
          );
          pawn.showColoredMoves();

          NclickedPiece = e.target;
          return NclickedPiece;
        }
      } else if (cell.id === "r") {
        rook.availabeMovesforRook(
          cell.parentElement.id,
          cell.name,
          turn,
          false
        );
        if (rook.allowedMoves.length !== 0) {
          NclickedPiece = e.target;
          this.undoAllowedMoves();
          rook.availabeMovesforRook(
            cell.parentElement.id,
            cell.name,
            turn,
            false
          );
          rook.showColoredMoves();
          return NclickedPiece;
        }
      } else if (cell.id === "b") {
        bishop.availableMovesforBishop(
          cell.parentElement.id,
          cell.name,
          turn,
          false
        );
        if (bishop.allowedMoves.length !== 0) {
          NclickedPiece = e.target;
          this.undoAllowedMoves();
          bishop.availableMovesforBishop(
            cell.parentElement.id,
            cell.name,
            turn,
            false
          );
          bishop.showColoredMoves();
          return NclickedPiece;
        }
      } else if (cell.id === "q") {
        bishop.availableMovesforBishop(
          cell.parentElement.id,
          cell.name,
          turn,
          false
        );
        rook.availabeMovesforRook(
          cell.parentElement.id,
          cell.name,
          turn,
          false
        );
        if (
          bishop.allowedMoves.length !== 0 ||
          rook.allowedMoves.length !== 0
        ) {
          NclickedPiece = e.target;
          this.undoAllowedMoves();
          bishop.availableMovesforBishop(
            cell.parentElement.id,
            cell.name,
            turn,
            false
          );
          rook.availabeMovesforRook(
            cell.parentElement.id,
            cell.name,
            turn,
            false
          );
          bishop.showColoredMoves();
          rook.showColoredMoves();
          return NclickedPiece;
        }
      } else if (cell.id === "k") {
        knight.availableMovesforKnight(
          cell.parentElement.id,
          cell.name,
          turn,
          false
        );
        if (knight.allowedMoves.length !== 0) {
          NclickedPiece = e.target;
          this.undoAllowedMoves();
          knight.availableMovesforKnight(
            cell.parentElement.id,
            cell.name,
            turn,
            false
          );
          knight.showColoredMoves();
          return NclickedPiece;
        }
      } else if (cell.id === "kg") {
        king.availableMovesforKing(cell.parentElement.id, cell.name, turn);
        if (king.allowedMoves.length !== 0) {
          NclickedPiece = e.target;
          this.undoAllowedMoves();
          king.availableMovesforKing(cell.parentElement.id, cell.name, turn);
          king.checkAttackedCells(
            this.whitePieces,
            this.blackPieces,
            cell.parentElement.id,
            this.whitepiecesobjects,
            this.blackpiecesobjects
          );
          king.showColoredMoves();

          return NclickedPiece;
        }
      }
    } else {
      let newPiece = cell;

      if (NclickedPiece !== undefined) {
        this.capturePiece(NclickedPiece, newPiece, cell.parentElement.id, e);
      }
    }
  };
  this.capturePiece = function (NclickedPiece, newPiece, id, e) {
    if (this.cantTakeAllyPiece(NclickedPiece, newPiece)) {
      if (NclickedPiece.id === "q") {
        if (bishop.allowedMovesforBishop(id) || rook.allowedMovesforRook(id)) {
          this.undoAllowedMoves();
          allowCapture = true;
        }
      } else if (NclickedPiece.id === "r") {
        if (rook.allowedMovesforRook(id)) {
          allowCapture = true;
        }
      } else if (NclickedPiece.id === "kg") {
        if (king.allowedMovesforKing(id)) {
          allowCapture = true;
        }
      } else if (NclickedPiece.id === "k") {
        if (knight.allowedMovesforKnight(id)) {
          allowCapture = true;
        }
      } else if (NclickedPiece.id === "b") {
        if (bishop.allowedMovesforBishop(id)) {
          allowCapture = true;
        }
      } else if (NclickedPiece.id === "p") {
        if (pawn.allowedMovesforPawn(id)) {
          allowCapture = true;
        }
      }

      if (allowCapture === true) {
        let id1 = id;

        if (e.target.hasChildNodes()) {
          moveSound.play();
          this.removePiecefromArray(newPiece);
          e.target.removeChild(newPiece);
        } else {
          moveSound.play();
          this.removePiecefromArray(newPiece);
          e.target.parentElement.removeChild(newPiece);
        }
        this.updatePiecesArray(id1, NclickedPiece.parentElement.id);

        document.getElementById(id1).appendChild(NclickedPiece);
        if (turn === "w") {
          turn = "b";
          document.getElementById("Turn").textContent = "Black's Turn";
        } else {
          turn = "w";
          document.getElementById("Turn").textContent = "White's Turn";
        }
        allowCapture = false;
      }
    }
  };
  this.undoAllowedMoves = function () {
    pawn.undoAllowedMoves();
    rook.undoAllowedMoves();
    bishop.undoAllowedMoves();
    knight.undoAllowedMoves();
    king.undoAllowedMoves();
  };

  this.cellClicked = function (clickedPiece, allowMove, e) {
    if (clickedPiece !== undefined) {
      if (clickedPiece.id === "p") {
        if (pawn.allowedMovesforPawn(e.target.id)) {
          allowMove = true;
        }
      } else if (clickedPiece.id === "r") {
        if (rook.allowedMovesforRook(e.target.id)) {
          allowMove = true;
        }
      } else if (clickedPiece.id === "b") {
        if (bishop.allowedMovesforBishop(e.target.id)) {
          allowMove = true;
        }
      } else if (clickedPiece.id === "q") {
        if (
          bishop.allowedMovesforBishop(e.target.id) ||
          rook.allowedMovesforRook(e.target.id)
        ) {
          allowMove = true;
        }
      } else if (clickedPiece.id === "k") {
        if (knight.allowedMovesforKnight(e.target.id)) {
          allowMove = true;
        }
      } else if (clickedPiece.id === "kg") {
        if (king.allowedMovesforKing(e.target.id)) {
          allowMove = true;
        }
      }
      if (allowMove === true) {
        let square = document.getElementById(e.target.id);
        if (clickedPiece.name === turn) {
          moveSound.play();
          let cellNo = clickedPiece.parentElement.id;
          square.appendChild(clickedPiece);

          this.updatePiecesArray(e.target.id, cellNo);

          if (turn === "w") {
            turn = "b";
            document.getElementById("Turn").textContent = "Black's Turn";
          } else {
            turn = "w";
            document.getElementById("Turn").textContent = "White's Turn";
          }
          allowMove = false;

          this.undoAllowedMoves();
        }
      }
    }
  };

  this.drawBoard = function () {
    let row = document.getElementById("a");
    let cellID = 1;
    let color = "#DEB887";
    for (let i = 0; i < 64; i++) {
      let element = document.createElement("div");

      element.id = row.id + cellID;

      cellID++;
      if (cellID === 9) {
        cellID = 1;
      }

      if (color === "#fffaf0") {
        color = "#DEB887";
      }

      //color = "#fffaf0";
      else {
        color = "#fffaf0";
      }
      element.style.backgroundColor = color;

      element.style.border = "1px solid black";
      element.style.height = "60px";
      element.style.width = "60px";
      element.style.marginRight = "2%";
      element.setAttribute("piece", "false");
      row.style.marginTop = "2%";
      this.elements.push(element);
      let currTurn = "w";

      row.appendChild(element);
      if (i == 7) {
        color = "#fffaf0";
        row = document.getElementById("b");
      } else if (i == 15) {
        row = document.getElementById("c");
        color = "#DEB887";
      } else if (i == 23) {
        color = "#fffaf0";
        row = document.getElementById("d");
      } else if (i == 31) {
        color = "#DEB887";
        row = document.getElementById("e");
      } else if (i == 39) {
        color = "#fffaf0";
        row = document.getElementById("f");
      } else if (i == 47) {
        color = "#DEB887";
        row = document.getElementById("g");
      } else if (i == 55) {
        color = "#fffaf0";
        row = document.getElementById("h");
      }
    }
  };
  this.cantTakeAllyPiece = function (clickedPiece, newPiece) {
    if (
      (clickedPiece.name === "w" && newPiece.name === "b") ||
      (clickedPiece.name === "b" && newPiece.name === "w")
    ) {
      return true;
    } else {
      return false;
    }
  };
}
let board = new Board();
board.startClock();
board.drawBoard();
window.onload = function () {
  board.drawPieces();
};
board.addPiecestoArray();
