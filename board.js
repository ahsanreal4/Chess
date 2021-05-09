let self;
class Board {
  elements;
  turn;
  checkmate;
  whitePieces;
  blackPieces;
  gameOver;
  MoveFunctions;
  currentClickedPiece;
  moveSound;
  beepSound;
  check;
  checkSound;
  checkmateSound;
  interval;

  constructor() {
    this.elements = [];
    this.turn = "white";
    this.checkmate = false;
    this.whitePieces = [];
    this.blackPieces = [];
    this.gameOver = false;
    this.check = false;
    this.MoveFunctions = new moveFunctions();
    this.moveSound = $("#myAudio")[0];
    this.beepSound = $("#myAudio4")[0];
    this.checkSound = $("#myAudio2")[0];
    this.checkmateSound = $("#myAudio3")[0];
    this.checkSound.volume = 0.1;
    this.checkmateSound.volume = 0.1;
    this.beepSound.volume = 0.05;
    this.moveSound.volume = 0.4;

    self = this;
  }
  drawBoard() {
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
      } else {
        color = "#fffaf0";
      }
      element.style.backgroundColor = color;

      element.style.border = "1px solid black";
      element.style.height = "60px";
      element.style.width = "60px";
      element.style.marginRight = "2%";
      row.style.marginTop = "2%";
      this.elements.push(element);

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
  }
  startClock() {
    let blackCounter = $("#White_Clock")[0];
    let whiteCounter = $("#Black_Clock")[0];
    let whiteminutes = 4;
    let whitesecs = 60;
    let blackmins = 4;
    let blacksecs = 60;

    this.interval = setInterval(() => {
      if ($("#Turn")[0].textContent === "White's Turn") {
        this.turn = "white";
      } else {
        this.turn = "black";
      }
      if (this.turn === "white") {
        if (this.checkmate === false) {
          if (whitesecs === 0) {
            if (whiteminutes >= 1) {
              whiteminutes--;
            } else {
              whiteminutes--;
              clearInterval(this.interval);
            }

            if (whiteminutes !== -1 && this.checkmate === false) {
              whitesecs = 59;
            } else {
              whitesecs = 0;
              this.gameOver = true;
              this.showGameOver();
              whiteCounter.textContent = "0:00";
              clearInterval(this.interval);
            }
          } else {
            whitesecs--;
          }
        } else {
          this.checkmateSound.play();
          this.gameOver = true;
          this.showGameOver();
          clearInterval(this.interval);
        }
        whiteCounter.textContent = whiteminutes + ": " + whitesecs;
      } else {
        if (this.checkmate === false) {
          if (blacksecs === 0) {
            if (blackmins >= 1) {
              blackmins--;
            } else {
              blackmins--;
              clearInterval(this.interval);
            }
            if (blackmins !== -1 && this.checkmate === false) {
              blacksecs = 59;
            } else {
              blacksecs = 0;
              this.gameOver = true;
              this.showGameOver();
              clearInterval(this.interval);
            }
          } else {
            blacksecs--;
          }
        } else {
          this.checkmateSound.play();
          this.gameOver = true;
          this.showGameOver();
          clearInterval(this.interval);
        }
        blackCounter.textContent = blackmins + ": " + blacksecs;
      }
    }, 1000);
  }
  showGameOver() {
    document.getElementById("over").style.display = "block";
  }
  drawPieces() {
    let queen = new Queen(
      "Pieces/white/straight/queen.svg",
      "d8",
      "queen",
      "white"
    );
    this.whitePieces.push(queen);
    queen = new Rook("Pieces/white/straight/rook.svg", "a8", "rook", "white");
    this.whitePieces.push(queen);
    queen = new Rook("Pieces/white/straight/rook.svg", "h8", "rook", "white");
    this.whitePieces.push(queen);
    queen = new Knight(
      "Pieces/white/straight/knight.svg",
      "b8",
      "knight",
      "white"
    );
    this.whitePieces.push(queen);
    queen = new Knight(
      "Pieces/white/straight/knight.svg",
      "g8",
      "knight",
      "white"
    );
    this.whitePieces.push(queen);
    queen = new Bishop(
      "Pieces/white/straight/bishop.svg",
      "c8",
      "bishop",
      "white"
    );
    this.whitePieces.push(queen);
    queen = new Bishop(
      "Pieces/white/straight/bishop.svg",
      "f8",
      "bishop",
      "white"
    );
    this.whitePieces.push(queen);
    queen = new King("Pieces/white/straight/king.svg", "e8", "king", "white");
    this.whitePieces.push(queen);
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
      let pawn;
      pawn = new Pawn(
        "Pieces/white/straight/pawn.svg",
        row + 7,
        "pawn",
        "white"
      );

      this.whitePieces.push(pawn);

      pawn = new Pawn(
        "Pieces/black/inverse/pawn.svg",
        row + 2,
        "pawn",
        "black"
      );

      this.blackPieces.push(pawn);
    }
    queen = new Rook("Pieces/black/inverse/rook.svg", "a1", "rook", "black");
    this.blackPieces.push(queen);
    queen = new Rook("Pieces/black/inverse/rook.svg", "h1", "rook", "black");
    this.blackPieces.push(queen);
    queen = new King("Pieces/black/inverse/king.svg", "e1", "king", "black");
    this.blackPieces.push(queen);
    queen = new Knight(
      "Pieces/black/inverse/knight.svg",
      "b1",
      "knight",
      "black"
    );
    this.blackPieces.push(queen);
    queen = new Knight(
      "Pieces/black/inverse/knight.svg",
      "g1",
      "knight",
      "black"
    );
    this.blackPieces.push(queen);
    queen = new Bishop(
      "Pieces/black/inverse/bishop.svg",
      "c1",
      "bishop",
      "black"
    );
    this.blackPieces.push(queen);
    queen = new Bishop(
      "Pieces/black/inverse/bishop.svg",
      "f1",
      "bishop",
      "black"
    );
    this.blackPieces.push(queen);
    queen = new Queen("Pieces/black/inverse/queen.svg", "d1", "queen", "black");
    this.blackPieces.push(queen);
  }
  addFunctionality() {
    this.elements.forEach((element) => {
      element.addEventListener("click", function (e) {
        if (self.gameOver === false) {
          let target = e.target;
          if (target.nodeName === "IMG" || target.hasChildNodes()) {
            if (target.nodeName === "IMG") {
              self.PieceClicked(e.target);
            } else {
              self.PieceClicked(e.target.firstChild);
            }
          } else {
            self.cellClicked(e.target);
          }
        }
      });
    });
    document.body.addEventListener("dblclick", function (e) {
      e.preventDefault();
    });
    document.body.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    document.body.addEventListener("mousemove", function (e) {
      e.preventDefault();
    });

    self.responsive();
    window.addEventListener("resize", function () {
      self.responsive();
    });
  }
  responsive() {
    let containerWidth = null;
    let containerMarginTop = null;
    let overWidth = null;
    let overHeight = null;
    let overFontSize = null;
    if (window.innerWidth < 350) {
      containerWidth = 290;
      containerMarginTop = 120;
      overWidth = 300;
      overHeight = 150;
      overFontSize = 35;
      self.elements.forEach((element) => {
        element.style.height = "30px";
        element.style.width = "30px";
        self.changeImageSizes(25);
      });
    } else if (window.innerWidth < 435) {
      containerWidth = 370;
      containerMarginTop = 120;
      overWidth = 300;
      overHeight = 150;
      overFontSize = 35;
      self.elements.forEach((element) => {
        element.style.height = "40px";
        element.style.width = "40px";
        self.changeImageSizes(35);
      });
    } else if (window.innerWidth < 520) {
      containerWidth = 445;
      containerMarginTop = 100;
      overWidth = 350;
      overHeight = 210;
      overFontSize = 45;
      self.elements.forEach((element) => {
        element.style.height = "50px";
        element.style.width = "50px";
        self.changeImageSizes(45);
      });
    } else if (window.innerWidth < 640) {
      containerWidth = 445;
      containerMarginTop = 100;
      overWidth = 350;
      overHeight = 210;
      overFontSize = 45;
      self.elements.forEach((element) => {
        element.style.height = "60px";
        element.style.width = "60px";
        self.changeImageSizes(55);
      });
    } else if (window.innerWidth > 640) {
      containerWidth = 645;
      containerMarginTop = 30;
      overWidth = 400;
      overHeight = 250;
      overFontSize = 55;
      self.elements.forEach((element) => {
        element.style.height = "75px";
        element.style.width = "75px";
        self.changeImageSizes(65);
      });
    }
    document.getElementById("container").style.width = `${containerWidth}px`;
    document.getElementById(
      "container"
    ).style.marginTop = `${containerMarginTop}px`;
    document.getElementById("over").style.width = `${overWidth}px`;
    document.getElementById("over").style.height = `${overHeight}px`;
    document.getElementById("over").style.fontSize = `${overFontSize}px`;
  }
  changeImageSizes(size) {
    self.whitePieces.forEach((element) => {
      let cellNo = document.getElementById(element.getCellNo()).id;
      let img = document.getElementById(cellNo).firstChild;
      img.setAttribute("width", size);
      img.setAttribute("height", size);
    });
    self.blackPieces.forEach((element) => {
      let cellNo = document.getElementById(element.getCellNo()).id;
      let img = document.getElementById(cellNo).firstChild;
      img.setAttribute("width", size);
      img.setAttribute("height", size);
    });
  }
  PieceClicked(clickedPiece) {
    if (clickedPiece.id === self.turn) {
      const name = clickedPiece.name;
      var object;
      switch (name) {
        case "pawn":
          object = self.findObject(clickedPiece.parentElement.id);

          if (object !== undefined) {
            object.availableMovesforPawn(self.turn);
            const moves = object.getAllowedMoves();
            if (moves.length !== 0) {
              self.currentClickedPiece = clickedPiece;
              self.undoAllowedMoves(self.turn, object.getCellNo());
              self.MoveFunctions.showColoredMoves(moves);
            } else {
              self.beepSound.play();
            }
          }

          break;

        case "queen":
          object = self.findObject(clickedPiece.parentElement.id);

          if (object !== undefined) {
            object.availableMovesforQueen(self.turn, false);
            const moves = object.getAllowedMoves();
            if (moves.length !== 0) {
              self.currentClickedPiece = clickedPiece;
              self.undoAllowedMoves(self.turn, object.getCellNo());
              self.MoveFunctions.showColoredMoves(moves);
            } else {
              self.beepSound.play();
            }
          }
          break;

        case "king":
          object = self.findObject(clickedPiece.parentElement.id);

          if (object !== undefined) {
            object.availableMovesforKing(self.turn, false, false);
            const moves = object.getAllowedMoves();
            if (moves.length !== 0) {
              self.currentClickedPiece = clickedPiece;
              self.undoAllowedMoves(self.turn, object.getCellNo());
              self.MoveFunctions.showColoredMoves(moves);
            } else {
              self.beepSound.play();
            }
          }

          break;

        case "rook":
          object = self.findObject(clickedPiece.parentElement.id);

          if (object !== undefined) {
            object.availableMovesforRook(self.turn, false);
            const moves = object.getAllowedMoves();
            if (moves.length !== 0) {
              self.currentClickedPiece = clickedPiece;
              self.undoAllowedMoves(self.turn, object.getCellNo());
              self.MoveFunctions.showColoredMoves(moves);
            } else {
              self.beepSound.play();
            }
          }
          break;

        case "knight":
          object = self.findObject(clickedPiece.parentElement.id);

          if (object !== undefined) {
            object.availableMovesforKnight(self.turn, false);
            const moves = object.getAllowedMoves();
            if (moves.length !== 0) {
              self.currentClickedPiece = clickedPiece;
              self.undoAllowedMoves(self.turn, object.getCellNo());
              self.MoveFunctions.showColoredMoves(moves);
            } else {
              self.beepSound.play();
            }
          }
          break;

        case "bishop":
          object = self.findObject(clickedPiece.parentElement.id);

          if (object !== undefined) {
            object.availableMovesforBishop(self.turn, false);
            const moves = object.getAllowedMoves();
            if (moves.length !== 0) {
              self.currentClickedPiece = clickedPiece;
              self.undoAllowedMoves(self.turn, object.getCellNo());
              self.MoveFunctions.showColoredMoves(moves);
            } else {
              self.beepSound.play();
            }
          }
          break;

        default:
          console.log("Error!");
      }
    } else {
      this.capturePiece(clickedPiece);
    }
  }
  capturePiece(clickedPiece) {
    let allowCapture = false;
    if (self.currentClickedPiece !== undefined) {
      const name = self.currentClickedPiece.name;
      let object = null;
      let cellNo = clickedPiece.parentElement.id;
      let currentPieceCellNo = self.currentClickedPiece.parentElement.id;

      if (name === "queen") {
        object = this.findObject(currentPieceCellNo);
        if (object !== null) {
          if (object.allowedMovesforQueen(cellNo)) {
            allowCapture = true;
          }
        }
      } else if (name === "pawn") {
        object = this.findObject(currentPieceCellNo);
        if (object !== null) {
          if (object.allowedMovesforPawn(cellNo)) {
            allowCapture = true;
          }
        }
      } else if (name === "rook") {
        object = this.findObject(currentPieceCellNo);
        if (object !== null) {
          if (object.allowedMovesforRook(cellNo)) {
            allowCapture = true;
          }
        }
      } else if (name === "bishop") {
        object = this.findObject(currentPieceCellNo);
        if (object !== null) {
          if (object.allowedMovesforBishop(cellNo)) {
            allowCapture = true;
          }
        }
      } else if (name === "knight") {
        object = this.findObject(currentPieceCellNo);
        if (object !== null) {
          if (object.allowedMovesforKnight(cellNo)) {
            allowCapture = true;
          }
        }
      } else if (name === "king") {
        object = this.findObject(currentPieceCellNo);
        if (object !== null) {
          if (object.allowedMovesforKing(cellNo)) {
            allowCapture = true;
          }
        }
      }
      if (allowCapture) {
        if (object !== null) {
          let temp = object.getCellNo();

          let newObject = self.findObject(cellNo);

          if (self.turn === "white") {
            self.removeObjectfromArray(cellNo, self.blackPieces);
          } else {
            self.removeObjectfromArray(cellNo, self.whitePieces);
          }
          object.setCellNo(cellNo);

          self.IsKingInCheckmate();
          if (self.check === true) {
            self.beepSound.play();
            allowCapture = false;
          }
          self.check = false;
          object.setCellNo(temp);
          if (self.turn === "white") {
            self.blackPieces.push(newObject);
          } else {
            self.whitePieces.push(newObject);
          }
        }
      }
      if (allowCapture === true) {
        self.moveSound.play();
        document.getElementById(cellNo).removeChild(clickedPiece);

        if (self.turn === "white") {
          self.removeObjectfromArray(cellNo, self.blackPieces);
        } else {
          self.removeObjectfromArray(cellNo, self.whitePieces);
        }

        document.getElementById(cellNo).appendChild(self.currentClickedPiece);
        object.setCellNo(cellNo);

        self.undoAllMoves();
        if (self.turn === "white") {
          self.turn = "black";
          $("#Turn")[0].textContent = "Black's Turn";
        } else {
          self.turn = "white";
          $("#Turn")[0].textContent = "White's Turn";
        }
        self.currentClickedPiece = undefined;
        self.IsKingInCheckmate();
        if (self.check === true) {
          self.checkSound.play();
          self.check = false;
        }
        self.undoAllMoves();
      } else {
        self.beepSound.play();
      }
    } else {
      self.beepSound.play();
    }
  }
  removeObjectfromArray(cellNo, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].getCellNo() === cellNo) {
        if (i === array.length - 1) {
          array.pop();
        } else {
          let temp = array[array.length - 1];
          array[array.length - 1] = array[i];
          array[i] = temp;
          array.pop();
          break;
        }
      }
    }
  }
  findObject(id) {
    for (let i = 0; i < self.whitePieces.length; i++) {
      if (self.whitePieces[i].getCellNo() === id) {
        return self.whitePieces[i];
      }
    }

    for (let i = 0; i < self.blackPieces.length; i++) {
      if (self.blackPieces[i].getCellNo() === id) {
        return self.blackPieces[i];
      }
    }
  }
  undoAllowedMoves(turn, cellNo) {
    if (turn === "white") {
      self.whitePieces.forEach((element) => {
        if (element.getCellNo() !== cellNo) {
          self.MoveFunctions.undoAllowedMoves(element.getAllowedMoves());
        }
      });
    } else {
      self.blackPieces.forEach((element) => {
        if (element.getCellNo() !== cellNo) {
          self.MoveFunctions.undoAllowedMoves(element.getAllowedMoves());
        }
      });
    }
  }
  cellClicked(cell) {
    let allowMove = false;

    if (self.currentClickedPiece !== undefined) {
      const object = self.findObject(self.currentClickedPiece.parentElement.id);
      if (self.currentClickedPiece.name === "pawn") {
        if (object.allowedMovesforPawn(cell.id)) {
          allowMove = true;
        }
      } else if (self.currentClickedPiece.name === "bishop") {
        if (object.allowedMovesforBishop(cell.id)) {
          allowMove = true;
        }
      } else if (self.currentClickedPiece.name === "rook") {
        if (object.allowedMovesforRook(cell.id)) {
          allowMove = true;
        }
      } else if (self.currentClickedPiece.name === "knight") {
        if (object.allowedMovesforKnight(cell.id)) {
          allowMove = true;
        }
      } else if (self.currentClickedPiece.name === "king") {
        if (object.allowedMovesforKing(cell.id)) {
          allowMove = true;
        }
      } else if (self.currentClickedPiece.name === "queen") {
        if (object.allowedMovesforQueen(cell.id)) {
          allowMove = true;
        }
      }
      if (allowMove) {
        let temp = object.getCellNo();
        object.setCellNo(cell.id);
        self.IsKingInCheckmate();
        if (self.check === true) {
          self.beepSound.play();
          allowMove = false;
        }
        self.check = false;
        object.setCellNo(temp);
      }
      if (allowMove === true) {
        self.moveSound.play();
        let square = document.getElementById(cell.id);
        square.append(self.currentClickedPiece);
        object.setCellNo(cell.id);
        self.undoAllMoves();
        if (self.turn === "white") {
          self.turn = "black";

          document.getElementById("Turn").textContent = "Black's Turn";
        } else {
          self.turn = "white";

          document.getElementById("Turn").textContent = "White's Turn";
        }
        self.currentClickedPiece = undefined;
        self.IsKingInCheckmate();
        if (self.check === true) {
          self.checkSound.play();
          self.check = false;
        }
        self.undoAllMoves();
      } else {
        //BEEP SOUND PLAYS WHEN WE CLICK A CELL WHICH MOVE IS NOT ALLOWED
        self.beepSound.play();
      }
    }
  }
  IsKingInCheckmate() {
    let object = null;
    if (self.turn === "white") {
      for (let i = 0; i < self.whitePieces.length; i++) {
        if (self.whitePieces[i].getName() === "king") {
          object = self.whitePieces[i];
          break;
        }
      }
    } else {
      for (let i = 0; i < self.blackPieces.length; i++) {
        if (self.blackPieces[i].getName() === "king") {
          object = self.blackPieces[i];
          break;
        }
      }
    }
    object.checkKingCheckmate(self.whitePieces, self.blackPieces);
  }
  undoAllMoves() {
    if (self.turn === "white") {
      self.whitePieces.forEach((element) => {
        self.MoveFunctions.undoAllowedMoves(element.getAllowedMoves());
      });
    } else {
      self.blackPieces.forEach((element) => {
        self.MoveFunctions.undoAllowedMoves(element.getAllowedMoves());
      });
    }
  }
  reset() {
    this.check = false;
    this.checkmate = false;
    this.gameOver = false;
    this.currentClickedPiece = undefined;
    clearInterval(this.interval);

    $("#White_Clock")[0].firstChild.textContent = "5:00";
    $("#Black_Clock")[0].firstChild.textContent = "5:00";
    this.startClock();
    $("#Turn")[0].textContent = "White's Turn";
    this.whitePieces.forEach((element) => {
      let img = document.getElementById(element.getCellNo()).firstChild;

      img.parentElement.removeChild(img);
    });
    this.whitePieces.length = 0;
    this.blackPieces.forEach((element) => {
      let img = document.getElementById(element.getCellNo()).firstChild;

      img.parentElement.removeChild(img);
    });
    this.blackPieces.length = 0;
    this.drawPieces();
    document.getElementById("over").style.display = "none";
  }
}
