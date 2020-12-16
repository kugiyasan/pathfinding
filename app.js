import aStar from "./algorithms/aStar.js";

let width = 20;
let height = 10;

let startPos = [2, 3];
let endPos = [15, 6];
let walls = [];

const map = new Array(height);
for (let i = 0; i < height; i++) map[i] = new Array(width);
const handleRadio = (cell, x, y, value) => {
  switch (value) {
    case "startPos":
      document.querySelector(".startPos").classList.remove("startPos");
      cell.classList.add("startPos");
      startPos = [x, y];
      break;
    case "endPos":
      document.querySelector(".endPos").classList.remove("endPos");
      cell.classList.add("endPos");
      endPos = [x, y];
      break;
    case "wall":
      if (
        cell.classList.contains("startPos") ||
        cell.classList.contains("endPos")
      )
        break;
      cell.classList.toggle("wall");
      const index = walls.indexOf([x, y]);
      if (index > -1) {
        walls.splice(index, 1);
      } else {
        walls.push([x, y]);
      }
  }
};

const createCell = (x, y) => {
  const cell = document.createElement("div");
  cell.setAttribute("class", `cell x${x} y${y}`);

  cell.onclick = () => {
    let radios = document.getElementsByName("choice");
    for (let i = 0; i < radios.length; i++)
      if (radios[i].checked) handleRadio(cell, x, y, radios[i].value);
  };
  return cell;
};

const createMapElement = (width, height) => {
  const mapElement = document.createElement("div");
  mapElement.setAttribute("class", "map");

  for (let y = 0; y < height; y++) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");

    for (let x = 0; x < width; x++) row.appendChild(createCell(x, y));

    mapElement.appendChild(row);
  }

  return mapElement;
};

// const displayPath = (mapElement, map, path) => {
//   for (let y in map)
//     for (let x in map[y]) {
//       if (map[y][x] === "wall") {
//       } else if (path[y][x]) {
//         console.log("path passes here");
//       }
//     }
// };

const initVisualizeButton = (mapElement) => {
  const button = document.getElementById("visualizeButton");
  button.onclick = () => {
    document
      .querySelectorAll(".pathChecked")
      .forEach((e) => e.classList.remove("pathChecked"));
    document
      .querySelectorAll(".path")
      .forEach((e) => e.classList.remove("path"));

    const path = aStar(width, height, startPos, endPos, walls);
    // displayPath(mapElement, map, path);
  };
};

const main = () => {
  const mainElement = document.getElementById("main");

  const mapElement = createMapElement(width, height);
  mainElement.appendChild(mapElement);

  document
    .querySelector(`.x${startPos[0]}.y${startPos[1]}`)
    .classList.add("startPos");
  document
    .querySelector(`.x${endPos[0]}.y${endPos[1]}`)
    .classList.add("endPos");

  initVisualizeButton(mapElement);
};

main();
