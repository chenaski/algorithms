import { heapSort } from "./heap-sort.js";

test.each([
  {
    list: [5, 4, 3, 2, 1, 0],
    expectedResult: [0, 1, 2, 3, 4, 5],
  },
  {
    list: [0, 8, 7, 3, 5, 2, 9, 1, 6, 4, -1, -3, -2],
    expectedResult: [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
])("heapSort: $list -> $expectedResult", ({ list, expectedResult }) => {
  expect(heapSort(list)).toEqual(expectedResult);
});
