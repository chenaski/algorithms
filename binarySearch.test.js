import { customAlphabet } from "nanoid";
import { binarySearch } from "./binarySearch.js";
const nanoid = customAlphabet("1234567890", 10);

const generateLargeListMaxSteps = () => {
  const listLength = 200000;
  const list = Array(listLength).fill(0).map(nanoid).sort();
  return { list, index: listLength / 2, steps: 17 };
};

const generateLargeListMinSteps = () => {
  const listLength = 200000;
  const list = Array(listLength).fill(0).map(nanoid).sort();
  return { list, index: listLength / 2 - 1, steps: 1 };
};

test.each([
  { list: [1, 3, 5, 7, 9], index: 2, steps: 1 },
  generateLargeListMaxSteps(),
  generateLargeListMinSteps(),
])(
  "binarySearch: list length: $list.length, index: $index, expected steps: $steps",
  ({ list, index, steps }) => {
    const target = list[index];

    expect(binarySearch(list, target)).toEqual([index, steps]);
  }
);
