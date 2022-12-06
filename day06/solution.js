import { file } from "bun";
const input = await file("input.txt").text();

const getProcessedCharacters = (markerLength) => {
  const windowQueue = [];
  for (let i = 0; i < markerLength - 1; i++) {
    windowQueue.push(input[i]);
  }
  for (let i = markerLength - 1; i < input.length; i++) {
    windowQueue.push(input[i]);
    if (isUnique(windowQueue)) {
      console.log(i + 1);
      return;
    } else {
      windowQueue.shift();
    }
  }
};

const isUnique = (arrayToCheck) =>
  arrayToCheck.length === new Set(arrayToCheck).size;

process.env.part == "part1"
  ? getProcessedCharacters(4)
  : getProcessedCharacters(14);
