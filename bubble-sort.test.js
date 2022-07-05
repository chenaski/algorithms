import { bubbleSort } from "./bubble-sort.js";

test("bubbleSort", () => {
  const arr = [0, 8, 7, 3, 5, 2, 9, 1, 6, 4, -1, -3, -2];
  const expectedResult = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  expect(bubbleSort(arr)).toEqual(expectedResult);
});
