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
      element.style.height = "50px";
      element.style.width = "50px";
      element.style.marginRight = "2%";

      row.style.marginTop = "2%";

      element.addEventListener("click", function (e) {
        if (e.target.nodeName === "IMG") {
          if (pieceClicked === false) {
            pieceClicked = true;
            clickedPiece = e.target;
          } else {
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
    element = document.getElementById("d8");
    var x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/white/straight/queen.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wq");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });

    element.appendChild(x);

    element = document.getElementById("a8");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/white/straight/rook.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wr1");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("b8");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/white/straight/knight.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wk1");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("g8");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/white/straight/knight.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wk2");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("c8");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/white/straight/bishop.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wb1");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("f8");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/white/straight/bishop.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wb2");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("e8");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/white/straight/king.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wkg");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("h8");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/white/straight/rook.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wr2");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("a7");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/white/straight/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("b7");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/white/straight/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("c7");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/white/straight/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
    element = document.getElementById("d7");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/white/straight/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("e7");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/white/straight/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("f7");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/white/straight/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("g7");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/white/straight/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("h7");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/white/straight/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "w");
    x.setAttribute("id", "wp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("a2");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/black/inverse/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("b2");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/black/inverse/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
    element = document.getElementById("c2");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/black/inverse/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
    element = document.getElementById("d2");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/black/inverse/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
    element = document.getElementById("e2");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/black/inverse/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
    element = document.getElementById("f2");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/black/inverse/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
    element = document.getElementById("g2");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/black/inverse/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
    element = document.getElementById("h2");
    x = document.createElement("IMG");
    x.setAttribute("src", "Pieces/black/inverse/pawn.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bp");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
    element = document.getElementById("a1");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/black/inverse/rook.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "br1");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("h1");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/black/inverse/rook.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "br2");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("e1");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/black/inverse/king.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bkg");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("b1");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/black/inverse/knight.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bk1");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("g1");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/black/inverse/knight.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bk2");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("c1");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/black/inverse/bishop.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bb1");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("f1");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/black/inverse/bishop.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bb2");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);

    element = document.getElementById("d1");
    x = document.createElement("IMG");

    x.setAttribute("src", "Pieces/black/inverse/queen.svg");
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", "b");
    x.setAttribute("id", "bq");
    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    element.appendChild(x);
  };
}
