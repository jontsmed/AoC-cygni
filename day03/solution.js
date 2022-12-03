import { file } from "bun";
const input = (await file("input.txt").text()).trim().split("\n");
const getItemPriority = (item) => {
  const charCode = item.charCodeAt(0);
  if (charCode < 97) return charCode - 38;
  else return charCode - 96;
};
const getPartOneSolution = () => {
  console.log(
    input.reduce((prioritySum, rucksack) => {
      const rucksackSize = rucksack.length;
      const compartmentSize = rucksackSize / 2;
      const itemsCompartmentOne = new Map();
      for (let i = 0; i < compartmentSize; i++) {
        const item = rucksack.charAt(i);
        itemsCompartmentOne.set(item);
      }
      for (let i = compartmentSize; i < rucksackSize; i++) {
        const item = rucksack.charAt(i);
        if (itemsCompartmentOne.has(item))
          return prioritySum + getItemPriority(item);
      }
    }, 0)
  );
};
const getPartTwoSolution = () => {
  let itemsElfOne = new Map();
  let itemsSharedByElfOneAndTwo = new Map();
  console.log(
    input.reduce((groupPrioritySum, rucksack, index) => {
      const rucksackSize = rucksack.length;
      const elfGroupNumber = index % 3;
      if (elfGroupNumber == 2) {
        for (let i = 0; i < rucksackSize; i++) {
          const item = rucksack.charAt(i);
          if (itemsSharedByElfOneAndTwo.has(item)) {
            itemsElfOne = new Map();
            itemsSharedByElfOneAndTwo = new Map();
            return groupPrioritySum + getItemPriority(item);
          }
        }
      }
      if (elfGroupNumber == 0) {
        for (let i = 0; i < rucksackSize; i++) {
          const item = rucksack.charAt(i);
          itemsElfOne.set(item);
        }
      } else if (elfGroupNumber == 1) {
        for (let i = 0; i < rucksackSize; i++) {
          const item = rucksack.charAt(i);
          if (itemsElfOne.has(item)) itemsSharedByElfOneAndTwo.set(item);
        }
      }
      return groupPrioritySum;
    }, 0)
  );
};
getPartOneSolution();
process.env.part == "part1" ? getPartOneSolution() : getPartTwoSolution();
