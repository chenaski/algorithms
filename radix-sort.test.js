import { countSort } from "./count-sort.js";

test.each([
  { list: [5, 6, 4, 3, 7], result: [3, 4, 5, 6, 7] },
  {
    list: [1, 321, 22, 2, 456, 3, 432, 876, 4, 987, 28, 5, 123],
    result: [1, 2, 3, 4, 5, 22, 28, 123, 321, 432, 456, 876, 987],
  },
])("countSort: $list -> $result", ({ list, result }) => {
  expect(countSort(list)).toEqual(result);
});
