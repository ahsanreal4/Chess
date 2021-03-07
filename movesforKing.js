function movesforKing() {
  this.allowedMovesforKing = function (clickedCell, targetCell, clickedPiece) {
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
    if (
      (clickVal - targetVal === 1 || clickVal - targetVal === -1) &&
      (clickedCellnum - targetCellnum === 1 ||
        clickedCellnum - targetCellnum === -1)
    ) {
      return true;
    } else if (clickVal - 1 === targetVal || clickVal + 1 === targetVal) {
      return true;
    } else if (
      clickedCellnum + 1 === targetCellnum ||
      clickedCellnum - 1 === targetCellnum
    ) {
      return true;
    }
  };
}
