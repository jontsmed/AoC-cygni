import { file } from "bun";
const [unparsedStacks, unparsedMoves] = (await file("input.txt").text()).split(
  "\n\n"
);

const parseStacks = () => {
  const horizontalBoxes = unparsedStacks.split("\n");

  const rowOfStackLabels = horizontalBoxes.pop();
  const indexes = Array.from(rowOfStackLabels)
    .filter((char) => char !== " ")
    .map((labels) => rowOfStackLabels.indexOf(labels));

  return indexes.map((index) =>
    horizontalBoxes
      .map((boxRow) => boxRow.charAt(index))
      .filter((box) => box !== " ")
      .reverse()
  );
};

const parseMoves = () => {
  const moves = unparsedMoves
    .trim()
    .split("\n")
    .map((moveRow) =>
      moveRow
        .split(" ")
        .filter((char) => !isNaN(char))
        .map((stringNum) => +stringNum)
    );
  return moves;
};

const getPartOneSolution = () => {
  const stacks = parseStacks();
  const moves = parseMoves();
  moves.forEach((move) => {
    makeMove(move, stacks);
  });
  console.log(getScoreString(stacks));
};

const getPartTwoSolution = () => {
  const stacks = parseStacks();
  const moves = parseMoves();

  moves.forEach((move) => {
    makeMove2(move, stacks);
  });
  console.log(getScoreString(stacks));
};

const makeMove = ([quantity, from, to], stacks) => {
  from = from - 1;
  to = to - 1;

  // for (let index = 1; index <= quantity; index++) {
  //   stacks.at(to).push(stacks.at(from).pop());
  // }

  const movingBoxes = stacks.at(from).splice(-quantity).reverse();
  const newStack = stacks.at(to).concat(movingBoxes);

  stacks[to] = newStack;
};

const makeMove2 = ([quantity, from, to], stacks) => {
  from = from - 1;
  to = to - 1;
  const movingBoxes = stacks.at(from).splice(-quantity);
  const newStack = stacks.at(to).concat(movingBoxes);

  stacks[to] = newStack;
};

const getScoreString = (finalStacks) => {
  return finalStacks.map((stack) => stack.at(-1)).join("");
};

process.env.part == "part1" ? getPartOneSolution() : getPartTwoSolution();
