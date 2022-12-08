import { file } from "bun";
const input = (await file("input.txt").text()).trim().split("\n");

const getParentDirectory = (dir) => {
  return dir.split("/").slice(0, -1).join("/");
};

const interpretCommand = (command, currentDirectory, fileStructure) => {
  if (command[2] == "..") {
    return getParentDirectory(currentDirectory);
  } else {
    const newDirectory = currentDirectory
      ? currentDirectory + "/" + command[2]
      : ".";
    fileStructure.set(newDirectory, {
      files: [],
      subDirectories: [],
    });
    return newDirectory;
  }
};

const calculateFileSizes = (files) => {
  return files.reduce((fileSize, sum) => fileSize + sum, 0);
};

const createFileStructure = (input) => {
  const fileStructure = new Map();
  let currentDirectory;
  input.forEach((row) => {
    const words = row.split(" ");
    if (words[0] == "$") {
      if (words[1] == "cd") {
        currentDirectory = interpretCommand(
          words,
          currentDirectory,
          fileStructure
        );
      }
    } else if (words[0] == "dir") {
      fileStructure.get(currentDirectory).subDirectories.push("/" + words[1]);
    } else {
      fileStructure.get(currentDirectory).files.push(+words[0]);
    }
  });
  return fileStructure;
};

const recursivePart1 = (dirPath, fileStructure, fileSizeSum) => {
  const currentDirectory = fileStructure.get(dirPath);
  const subDirectoriesSizes = currentDirectory.subDirectories.reduce(
    (fileSizes, subDirectoryPath) => {
      return (
        recursivePart1(dirPath + subDirectoryPath, fileStructure, fileSizeSum) +
        fileSizes
      );
    },
    0
  );

  const dirFileSizes = calculateFileSizes(currentDirectory.files);
  const dirSize = dirFileSizes + subDirectoriesSizes;
  if (dirSize <= 100000) {
    fileSizeSum.value = fileSizeSum.value + dirSize;
  }
  return dirSize;
};

const recursivePart2 = (dirPath, fileStructure, fileSizeSum) => {
  const currentDirectory = fileStructure.get(dirPath);
  const subDirectoriesSizes = currentDirectory.subDirectories.reduce(
    (fileSizes, subDirectoryPath) => {
      return (
        recursivePart2(dirPath + subDirectoryPath, fileStructure, fileSizeSum) +
        fileSizes
      );
    },
    0
  );

  const dirFileSizes = calculateFileSizes(currentDirectory.files);
  const dirSize = dirFileSizes + subDirectoriesSizes;
  currentDirectory.size = dirSize;
  return dirSize;
};

const getPartOneSolution = () => {
  const fileSizeSum = { value: 0 };
  const fileStructure = createFileStructure(input);
  const rootPath = ".";
  recursivePart1(rootPath, fileStructure, fileSizeSum);
  console.log(fileSizeSum.value);
};

const getPartTwoSolution = () => {
  const fileSizeSum = { value: 0 };
  const fileStructure = createFileStructure(input);
  const rootPath = ".";
  const usedSpace = recursivePart2(rootPath, fileStructure, fileSizeSum);
  const spaceNeeded = usedSpace - (70000000 - 30000000);
  const dirIterator = fileStructure.values();

  let dirToDelete = 70000000;

  for (let i = 0; i < fileStructure.size; i++) {
    const size = dirIterator.next().value.size;
    if (size > spaceNeeded && size < dirToDelete) {
      dirToDelete = size;
    }
  }

  console.log(dirToDelete);
};

process.env.part == "part1" ? getPartOneSolution() : getPartTwoSolution();
