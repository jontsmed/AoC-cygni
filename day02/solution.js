import { file } from "bun";

const opponentMoveMagicConstant = 64;
const ourMoveMagicConstant = 87;
const input = (await file("input.txt").text()).split("\n");

const getPartOneSolution = async () => {
  console.log(
    input.reduce((total, roundString) => {
      const ourShapeScore = roundString.charCodeAt(2) - ourMoveMagicConstant;
      const opponentShape =
        roundString.charCodeAt(0) - opponentMoveMagicConstant;
      const result = opponentShape - ourShapeScore;
      if (result == 0) return total + ourShapeScore + 3;
      if (result == 2 || result == -1) return total + ourShapeScore + 6;
      return total + ourShapeScore;
    }, 0)
  );
};

const getPartTwoSolution = async () => {
  console.log(
    input.reduce((total, roundString) => {
      const outcomeScore =
        (roundString.charCodeAt(2) - (ourMoveMagicConstant + 1)) * 3;
      const opponentMove =
        roundString.charCodeAt(0) - opponentMoveMagicConstant;
      const result = opponentMove - outcomeScore;

      if (result == -3 || Math.abs(result) == 2)
        return total + outcomeScore + 1;
      if (result == 3 || result == -1 || result == -5)
        return total + outcomeScore + 2;
      return total + outcomeScore + 3;
    }, 0)
  );
};

process.env.part == "part1" ? getPartOneSolution() : getPartTwoSolution();
