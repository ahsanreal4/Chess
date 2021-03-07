function movesforRook() {
  this.allowedMovesforRook = function (clickedCell, targetCell, clickedPiece) {
    let clickVal, targetVal;

    var clickedCellrow = clickedCell.substring(0, 1);
    var targetCellrow = targetCell.substring(0, 1);

    var clickedCellnumString = clickedCell.replace(/^\D+/g, "");
    var targetCellnumString = targetCell.replace(/^\D+/g, "");
    var clickedCellnum = parseInt(clickedCellnumString);
    var targetCellnum = parseInt(targetCellnumString);

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

    switch (targetCellrow) {
      case "a":
        targetVal = 1;
        break;

      case "b":
        targetVal = 2;
        break;

      case "c":
        targetVal = 3;
        break;

      case "d":
        targetVal = 4;
        break;

      case "e":
        targetVal = 5;
        break;

      case "f":
        targetVal = 6;
        break;

      case "g":
        targetVal = 7;
        break;
      case "h":
        targetVal = 8;
        break;
      default:
        break;
    }

    let row;
    if (clickVal === targetVal) {
      if (clickVal === 1) {
        row = "a";
      } else if (clickVal === 2) {
        row = "b";
      } else if (clickVal === 3) {
        row = "c";
      } else if (clickVal === 4) {
        row = "d";
      } else if (clickVal === 5) {
        row = "e";
      } else if (clickVal === 6) {
        row = "f";
      } else if (clickVal === 7) {
        row = "g";
      } else if (clickVal === 8) {
        row = "h";
      }
      if (clickedCellnum > targetCellnum) {
        for (let i = clickedCellnum - 1; i > targetCellnum; i--) {
          if (document.getElementById(row + i).hasChildNodes()) {
            return false;
          }
        }
        return true;
      } else if (clickedCellnum < targetCellnum) {
        for (let i = clickedCellnum + 1; i < targetCellnum; i++) {
          if (document.getElementById(row + i).hasChildNodes()) {
            return false;
          }
        }
        return true;
      }
    } else if (clickedCellnum === targetCellnum) {
      if (clickVal < targetVal) {
        for (let i = clickVal + 1; i < targetVal; i++) {
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
          if (document.getElementById(row + clickedCellnum).hasChildNodes()) {
            return false;
          }
        }
        return true;
      } else if (clickVal > targetVal) {
        for (let i = clickVal - 1; i > targetVal; i--) {
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

          if (document.getElementById(row + clickedCellnum).hasChildNodes()) {
            return false;
          }
        }
        return true;
      }
    }
  };
}
