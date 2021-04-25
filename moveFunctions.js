class moveFunctions {
  constructor() {}
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
  column(clickedCellrow) {
    switch (clickedCellrow) {
      case "a":
        return 1;

      case "b":
        return 2;

      case "c":
        return 3;

      case "d":
        return 4;

      case "e":
        return 5;
      case "f":
        return 6;

      case "g":
        return 7;
      case "h":
        return 8;
      default:
        break;
    }
  }
  showColoredMoves(array) {
    array.forEach((element) => {
      document.getElementById(element).style.border = "6px solid red";
    });
  }
  allowedMoves(targetCell, array) {
    for (let i = 0; i < array.length; i++) {
      if (targetCell === array[i]) {
        return true;
      }
    }
    return false;
  }
  undoAllowedMoves(array) {
    array.forEach((element) => {
      document.getElementById(element).style.border = "1px solid black";
    });
    array.length = 0;
  }
  findObjectonCellNo(cellNo) {
    for (let i = 0; i < board.whitePieces.length; i++) {
      if (board.whitePieces[i].getCellNo() === cellNo) {
        return board.whitePieces[i];
      }
    }
    for (let i = 0; i < board.blackPieces.length; i++) {
      if (board.blackPieces[i].getCellNo() === cellNo) {
        return board.blackPieces[i];
      }
    }
    return null;
  }
}
