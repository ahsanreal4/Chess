class Piece {
  cellNo;
  color;
  name;
  constructor(imgUrl, cellNo, name, color) {
    this.cellNo = cellNo;
    this.color = color;
    this.name = name;
    let element = document.getElementById(cellNo);

    let x = document.createElement("IMG");
    x.setAttribute("src", imgUrl);
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", name);
    x.setAttribute("id", color);

    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });

    element.appendChild(x);
  }
  getCellNo() {
    return this.cellNo;
  }
  setCellNo(cellNo) {
    this.cellNo = cellNo;
  }
  getColor() {
    return this.color;
  }
  getName() {
    return this.name;
  }
}
