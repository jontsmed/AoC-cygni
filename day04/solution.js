const input = require("fs")
  .readFileSync("input.txt")
  .toString()
  .trim()
  .split("\n");

const getPartOneSolution = () => {
  console.log(
    input.reduce((overlaps, pair) => {
      const [[elf1Start, elf1End], [elf2Start, elf2End]] = pair
        .split(",")
        .map((range) => range.split("-").map((id) => +id));

      const diffStart = elf1Start - elf2Start;
      const diffEnd = elf1End - elf2End;
      if ((diffStart < 0 && diffEnd < 0) || (diffStart > 0 && diffEnd > 0))
        return overlaps;
      return overlaps + 1;
    }, 0)
  );
};
const getPartTwoSolution = () => {
  console.log(
    input.reduce((overlaps, pair) => {
      const [[elf1Start, elf1End], [elf2Start, elf2End]] = pair
        .split(",")
        .map((range) => range.split("-").map((id) => +id));
      if (elf1End < elf2Start || elf2End < elf1Start) return overlaps;
      return overlaps + 1;
    }, 0)
  );
};
process.env.part == "part1" ? getPartOneSolution() : getPartTwoSolution();
