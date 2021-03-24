var pieces;
pieces = new Pieces();
pieces.draw();

let blackCounter = document.getElementById("White_Clock");
let whiteCounter = document.getElementById("Black_Clock");
let whiteminutes = 4;
let whitesecs = 60;
let blackmins = 4;
let blacksecs = 60;
let turn;
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
      whitesecs = 60;
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
      blacksecs = 60;
    } else {
      blacksecs--;
    }
    blackCounter.textContent = blackmins + ": " + blacksecs;
  }
}, 1000);
