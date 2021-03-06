import { countSort } from "./count-sort.js";

test.each([
  { list: [5, 6, 4, 3, 7], result: [3, 4, 5, 6, 7] },
  {
    list: [9, 7, 5, 3, 1, 2, 4, 6, 8, 0, 8, 6, 4, 2, 1, 3, 5, 7],
    result: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9],
  },
  {
    list: [958, 143, 736, 123, 911, 20, 26],
    result: [20, 911, 123, 736, 143, 958, 26],
    position: 1,
  },
])("countSort(position: $position): $list -> $result", ({ list, result, position }) => {
  expect(countSort(list, position)).toEqual(result);
});
