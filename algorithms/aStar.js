import AStarMinHeap from "./minHeap.js";

const displayPath = (path) => {
  for (let [x, y] of path) {
    document.querySelector(`.x${x}.y${y}`).classList.add("path");
  }
};

const reconstructPath = (cameFrom, current) => {
  const totalPath = [current];
  while (cameFrom[current]) {
    current = cameFrom[current];
    totalPath.push(current);
  }
  return totalPath.sort(() => -1);
};

const aStar = (width, height, startPos, endPos, walls) => {
  const openSet = new AStarMinHeap({
    coords: startPos,
    fScore: h(startPos, endPos),
  });
  const cameFrom = {};

  const gScore = {};
  gScore[startPos] = 0;

  let current;

  const explore = () => {
    if (!openSet.length()) {
      clearInterval(interval);
      alert("There is no valid path!");
      throw "There is no valid path!";
    }

    current = openSet.popMin().coords;

    if (current[0] == endPos[0] && current[1] == endPos[1]) {
      console.log("gScore", gScore);
      clearInterval(interval);
      const path = reconstructPath(cameFrom, current);
      displayPath(path);
      return;
    }

    for (let neighbor of getNeighbors(current)) {
      const [x, y] = neighbor;
      if (x < 0 || x >= width || y < 0 || y > height) continue;
      if (walls.some((v) => v[0] == x && v[1] == y)) continue;
      document
        .querySelector(`.x${current[0]}.y${current[1]}`)
        .classList.add("pathChecked");

      const tentativeGScore = gScore[current] + 1;
      if (gScore[neighbor] == undefined || tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        if (!openSet.includes(neighbor))
          openSet.push({
            coords: neighbor,
            fScore: gScore[neighbor] + h(neighbor, endPos),
          });
      }
    }
  };

  const interval = setInterval(explore, 50);
};

const h = (startPos, endPos) => {
  const [x1, y1] = startPos;
  const [x2, y2] = endPos;
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

const getNeighbors = (coords) => {
  const [x, y] = coords;
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
};

export default aStar;
