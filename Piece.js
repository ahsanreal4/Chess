class Piece {
  constructor(imgUrl, cellNo, name, id, color) {
    let element = document.getElementById(cellNo);

    let x = document.createElement("IMG");
    x.setAttribute("src", imgUrl);
    x.setAttribute("width", "50");
    x.setAttribute("height", "50");
    x.setAttribute("name", name);
    x.setAttribute("id", id);
    x.setAttribute("color", color);

    x.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });

    element.appendChild(x);
  }
}
