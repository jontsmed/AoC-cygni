import { file } from "bun";
const treeMap = new Map();
const rows = (await file("input.txt").text()).trim().split("\n");
const maxIndex = rows.length;

rows.forEach((row, r) => {
  row.split("").forEach((char, c) => {
    treeMap.set(r + " " + c, {
      height: +char,
      visibleDirections: {
        west: undefined,
        east: undefined,
        south: undefined,
        north: undefined,
      },
    });
  });
});

const getTree = (r, c) => {
  const tree = treeMap.get(r + " " + c);
  return tree;
};

const getPartOneSolution = () => {
  let nrVisibleTrees = 0;

  for (let r = 0; r < maxIndex; r++) {
    for (let c = 0; c < maxIndex; c++) {
      if (treeIsVisible(r, c)) {
        nrVisibleTrees = nrVisibleTrees + 1;
      }
    }
  }
  console.log(nrVisibleTrees);
};

const getPartTwoSolution = () => {
  let highestScore = 0;

  for (let r = 0; r < maxIndex; r++) {
    for (let c = 0; c < maxIndex; c++) {
      const scenicScore = getScenicScore(r, c);

      if (scenicScore > highestScore) highestScore = scenicScore;
    }
  }
  console.log(highestScore);
};

const getScenicScore = (r, c) => {
  const tree = getTree(r, c);

  let y = 1;
  let scenicScore = {
    north: 0,
    west: 0,
    south: 0,
    east: 0,
  };

  let stop = false;

  while (!stop) {
    const res = treeVisibilityInDirection2(tree, getTree(r - y, c), "north");
    if (res === undefined) {
      break;
    }
    scenicScore.north++;
    y++;
    stop = res;
  }

  let x = 1;
  stop = false;
  while (!stop) {
    const res = treeVisibilityInDirection2(tree, getTree(r, c - x), "west");
    if (res === undefined) {
      break;
    }
    scenicScore.west++;
    x++;
    stop = res;
  }

  y = 1;
  stop = false;
  while (!stop) {
    const res = treeVisibilityInDirection2(tree, getTree(r + y, c), "south");
    if (res === undefined) {
      break;
    }
    scenicScore.south++;
    y++;
    stop = res;
  }

  x = 1;
  stop = false;
  while (!stop) {
    const res = treeVisibilityInDirection2(tree, getTree(r, c + x), "east");
    if (res === undefined) {
      break;
    }
    scenicScore.east++;
    x++;
    stop = res;
  }
  return Object.values(scenicScore).reduce(
    (product, score) => product * score,
    1
  );
};

const treeIsVisible = (r, c) => {
  const tree = getTree(r, c);

  let y = 1;
  //Check north direction
  while (typeof tree.visibleDirections.north === "undefined") {
    tree.visibleDirections.north = treeVisibilityInDirection(
      tree,
      getTree(r - y, c),
      "north"
    );
    y++;
  }

  let x = 1;
  while (typeof tree.visibleDirections.west === "undefined") {
    tree.visibleDirections.west = treeVisibilityInDirection(
      tree,
      getTree(r, c - x),
      "west"
    );
    x++;
  }

  y = 1;
  while (typeof tree.visibleDirections.south === "undefined") {
    tree.visibleDirections.south = treeVisibilityInDirection(
      tree,
      getTree(r + y, c),
      "south"
    );
    y++;
  }
  x = 1;
  while (typeof tree.visibleDirections.east === "undefined") {
    tree.visibleDirections.east = treeVisibilityInDirection(
      tree,
      getTree(r, c + x),
      "east"
    );
    x++;
  }

  return (
    tree.visibleDirections.north ||
    tree.visibleDirections.west ||
    tree.visibleDirections.east ||
    tree.visibleDirections.south
  );
};

const treeVisibilityInDirection = (tree, compareTree, direction) => {
  if (typeof compareTree === "undefined") {
    return true;
  }
  if (compareTree.height >= tree.height) return false;
  if (compareTree.visibleDirections[direction]) return true;
};
const treeVisibilityInDirection2 = (tree, compareTree) => {
  if (typeof compareTree === "undefined") {
    return undefined;
  }
  if (compareTree.height >= tree.height) return true;
  return false;
};

process.env.part == "part1" ? getPartOneSolution() : getPartTwoSolution();
