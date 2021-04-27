//Program Driver
const t0 = performance.now();
let board = new Board();
$(function () {
  board.drawBoard();
  board.startClock();
  board.drawPieces();
  board.addFunctionality();

  const t1 = performance.now();
  console.log(`Game Loaded in ${t1 - t0} milliseconds.`);
});
