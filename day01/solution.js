const getPartOneSolution = () => {
  console.log(
    require("fs")
      .readFileSync("input.txt")
      .toString()
      .split("\n\n")
      .reduce((p, c) => {
        const calorieCount = c
          .split("\n")
          .reduce((q, r) => parseInt(q) + parseInt(r), 0);
        return calorieCount > p ? calorieCount : p;
      }, 0)
  );
};

const getPartTwoSolution = () => {
  const elfCalorieCounts = [0, 0, 0];
  require("fs")
    .readFileSync("input.txt")
    .toString()
    .split("\n\n")
    .reduce((elfCalorieCounts, elfStringCalories) => {
      const elfCalorieCount = elfStringCalories
        .split("\n")
        .reduce((q, r) => parseInt(q) + parseInt(r), 0);
      for (let i = 0; i < 3; i++) {
        if (elfCalorieCounts[i] < elfCalorieCount) {
          elfCalorieCounts.splice(i, 0, elfCalorieCount);
          break;
        }
      }
      return elfCalorieCounts;
    }, elfCalorieCounts);
  console.log(elfCalorieCounts[0] + elfCalorieCounts[1] + elfCalorieCounts[2]);
};
process.env.part === "part1" ? getPartOneSolution() : getPartTwoSolution();
