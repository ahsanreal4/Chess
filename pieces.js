function Pieces() {
  let pieceClicked = false;
  let turn = "w";

  let moves = new Moves();
  let Movesforknights = new movesForKnight();
  let MovesforRook = new movesforRook();
  let MovesforBishop = new movesforBishop();
  let MovesforKing = new movesforKing();
  let clickedPiece;
  let color = "#DEB887";
  this.draw = function () {
    let row = document.getElementById("a");
    let cellID = 1;
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

      row.style.marginTop = "2%";

      element.addEventListener("click", function (e) {
        if (e.target.nodeName === "IMG") {
          if (pieceClicked === false) {
            pieceClicked = true;
            clickedPiece = e.target;
            if (
              clickedPiece.id === "wb1" ||
              clickedPiece.id === "wb2" ||
              clickedPiece.id === "bb1" ||
              clickedPiece.id === "bb2"
            ) {
              MovesforBishop.availableMovesforBishop(
                e.target.parentElement.id,
                clickedPiece,
                turn
              );
            } else if (clickedPiece.id === "wkg" || clickedPiece.id === "bkg") {
              MovesforKing.availableMovesforKing(
                e.target.parentElement.id,
                clickedPiece,
                turn
              );
            } else if (
              clickedPiece.id === "wk1" ||
              clickedPiece.id === "wk2" ||
              clickedPiece.id === "bk1" ||
              clickedPiece.id === "bk2"
            ) {
              Movesforknights.availableMovesforKnights(
                e.target.parentElement.id,
                clickedPiece,
                turn
              );
            } else if (
              clickedPiece.id === "wr1" ||
              clickedPiece.id === "wr2" ||
              clickedPiece.id === "br1" ||
              clickedPiece.id === "br2"
            ) {
              MovesforRook.availableMovesforRook(
                e.target.parentElement.id,
                clickedPiece,
                turn
              );
            } else if (clickedPiece.id === "wq" || clickedPiece.id === "bq") {
              MovesforBishop.availableMovesforBishop(
                e.target.parentElement.id,
                clickedPiece,
                turn
              );
              MovesforRook.availableMovesforRook(
                e.target.parentElement.id,
                clickedPiece,
                turn
              );
            } else if (clickedPiece.id === "wp" || clickedPiece.id === "bp") {
              moves.availableMovesforPawn(
                e.target.parentElement.id,
                clickedPiece,
                turn
              );
            }
          } else {
            MovesforBishop.undoAllowedMoves();
            MovesforKing.undoAllowedMoves();
            Movesforknights.undoAllowedMoves();
            MovesforRook.undoAllowedMoves();
            moves.undoAllowedMoves();

            let allowCapture = false;
            let newPiece = e.target;
            if (moves.cantTakeAllyPiece(clickedPiece, newPiece)) {
              if (
                (clickedPiece.id === "wp" && turn === "w") ||
                (clickedPiece.id === "bp" && turn === "b")
              ) {
                if (
                  moves.capturingRulesforPawn(
                    clickedPiece,
                    newPiece,
                    clickedPiece.parentElement.id,
                    newPiece.parentElement.id
                  )
                ) {
                  allowCapture = true;
                } else {
                  allowCapture = false;
                }
              } else if (
                ((clickedPiece.id === "wk1" || clickedPiece.id === "wk2") &&
                  turn === "w") ||
                ((clickedPiece.id === "bk1" || clickedPiece.id === "bk2") &&
                  turn === "b")
              ) {
                if (
                  Movesforknights.allowedMovesforKnights(
                    clickedPiece.parentElement.id,
                    e.target.parentElement.id,
                    clickedPiece
                  )
                ) {
                  allowCapture = true;
                }
              } else if (
                ((clickedPiece.id === "wr1" || clickedPiece.id === "wr2") &&
                  turn === "w") ||
                ((clickedPiece.id === "br1" || clickedPiece.id === "br2") &&
                  turn === "b")
              ) {
                if (
                  MovesforRook.allowedMovesforRook(
                    clickedPiece.parentElement.id,
                    e.target.parentElement.id,
                    clickedPiece
                  )
                ) {
                  allowCapture = true;
                }
              } else if (
                ((clickedPiece.id === "wb1" || clickedPiece.id === "wb2") &&
                  turn === "w") ||
                ((clickedPiece.id === "bb1" || clickedPiece.id === "bb2") &&
                  turn === "b")
              ) {
                if (
                  MovesforBishop.allowedMovesforBishop(
                    clickedPiece.parentElement.id,
                    e.target.parentElement.id,
                    clickedPiece
                  )
                ) {
                  allowCapture = true;
                }
              } else if (
                (clickedPiece.id === "wq" && turn === "w") ||
                (clickedPiece.id === "bq" && turn === "b")
              ) {
                if (
                  MovesforBishop.allowedMovesforBishop(
                    clickedPiece.parentElement.id,
                    e.target.parentElement.id,
                    clickedPiece
                  ) ||
                  MovesforRook.allowedMovesforRook(
                    clickedPiece.parentElement.id,
                    e.target.parentElement.id,
                    clickedPiece
                  )
                ) {
                  allowCapture = true;
                }
              } else if (
                (clickedPiece.id === "wkg" && turn === "w") ||
                (clickedPiece.id === "bkg" && turn === "b")
              ) {
                if (
                  MovesforKing.allowedMovesforKing(
                    clickedPiece.parentElement.id,
                    e.target.parentElement.id,
                    clickedPiece
                  )
                ) {
                  allowCapture = true;
                }
              }
              if (allowCapture === true) {
                let id = e.target.parentElement.id;
                e.target.parentElement.removeChild(newPiece);
                document.getElementById(id).appendChild(clickedPiece);
                if (turn === "w") {
                  turn = "b";
                  document.getElementById("Turn").textContent = "Black's Turn";
                } else {
                  turn = "w";
                  document.getElementById("Turn").textContent = "White's Turn";
                }
              }
            }
            pieceClicked = false;
          }
        } else {
          MovesforBishop.undoAllowedMoves();
          MovesforRook.undoAllowedMoves();

          if (pieceClicked === true) {
            let allowMove = false;
            if (
              (clickedPiece.id === "wp" && turn === "w") ||
              (clickedPiece.id === "bp" && turn === "b")
            ) {
              if (
                moves.allowedMovesforPawn(
                  clickedPiece.parentElement.id,
                  e.target.id,
                  clickedPiece
                )
              ) {
                allowMove = true;
              } else {
                allowMove = false;
              }
            } else if (
              ((clickedPiece.id === "wk1" || clickedPiece.id === "wk2") &&
                turn === "w") ||
              ((clickedPiece.id === "bk1" || clickedPiece.id === "bk2") &&
                turn === "b")
            ) {
              if (
                Movesforknights.allowedMovesforKnights(
                  clickedPiece.parentElement.id,
                  e.target.id,
                  clickedPiece
                )
              ) {
                allowMove = true;
              }
            } else if (
              ((clickedPiece.id === "wr1" || clickedPiece.id === "wr2") &&
                turn === "w") ||
              ((clickedPiece.id === "br1" || clickedPiece.id === "br2") &&
                turn === "b")
            ) {
              if (
                MovesforRook.allowedMovesforRook(
                  clickedPiece.parentElement.id,
                  e.target.id,
                  clickedPiece
                )
              ) {
                allowMove = true;
              }
            } else if (
              ((clickedPiece.id === "wb1" || clickedPiece.id === "wb2") &&
                turn === "w") ||
              ((clickedPiece.id === "bb1" || clickedPiece.id === "bb2") &&
                turn === "b")
            ) {
              if (
                MovesforBishop.allowedMovesforBishop(
                  clickedPiece.parentElement.id,
                  e.target.id,
                  clickedPiece
                )
              ) {
                allowMove = true;
              }
            } else if (
              (clickedPiece.id === "wq" && turn === "w") ||
              (clickedPiece.id === "bq" && turn === "b")
            ) {
              if (
                MovesforBishop.allowedMovesforBishop(
                  clickedPiece.parentElement.id,
                  e.target.id,
                  clickedPiece
                ) ||
                MovesforRook.allowedMovesforRook(
                  clickedPiece.parentElement.id,
                  e.target.id,
                  clickedPiece
                )
              ) {
                allowMove = true;
              }
            } else if (
              (clickedPiece.id === "wkg" && turn === "w") ||
              (clickedPiece.id === "bkg" && turn === "b")
            ) {
              if (
                MovesforKing.allowedMovesforKing(
                  clickedPiece.parentElement.id,
                  e.target.id,
                  clickedPiece
                )
              ) {
                allowMove = true;
              }
            }
            if (allowMove === true) {
              let square = document.getElementById(e.target.id);
              square.appendChild(clickedPiece);
              if (turn === "w") {
                turn = "b";
                document.getElementById("Turn").textContent = "Black's Turn";
              } else {
                turn = "w";
                document.getElementById("Turn").textContent = "White's Turn";
              }
            }

            pieceClicked = false;
          }
        }
      });
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

    let piece = new Piece("Pieces/white/straight/queen.svg", "d8", "w", "wq");
    piece = new Piece("Pieces/white/straight/rook.svg", "a8", "w", "wr1");
    piece = new Piece("Pieces/white/straight/knight.svg", "b8", "w", "wk1");
    piece = new Piece("Pieces/white/straight/knight.svg", "g8", "w", "wk2");
    piece = new Piece("Pieces/white/straight/bishop.svg", "c8", "w", "wb1");
    piece = new Piece("Pieces/white/straight/bishop.svg", "f8", "w", "wb2");
    piece = new Piece("Pieces/white/straight/king.svg", "e8", "w", "wkg");
    piece = new Piece("Pieces/white/straight/rook.svg", "h8", "w", "wr2");

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
      piece = new Piece("Pieces/white/straight/pawn.svg", row + 7, "w", "wp");
      piece = new Piece("Pieces/black/inverse/pawn.svg", row + 2, "b", "bp");
    }

    piece = new Piece("Pieces/black/inverse/rook.svg", "a1", "b", "br1");
    piece = new Piece("Pieces/black/inverse/rook.svg", "h1", "b", "br2");
    piece = new Piece("Pieces/black/inverse/king.svg", "e1", "b", "bkg");
    piece = new Piece("Pieces/black/inverse/knight.svg", "b1", "b", "bk1");
    piece = new Piece("Pieces/black/inverse/knight.svg", "g1", "b", "bk2");
    piece = new Piece("Pieces/black/inverse/bishop.svg", "c1", "b", "bb1");
    piece = new Piece("Pieces/black/inverse/bishop.svg", "f1", "b", "bb2");
    piece = new Piece("Pieces/black/inverse/queen.svg", "d1", "b", "bq");
  };
}
