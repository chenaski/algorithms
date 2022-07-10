import { shellSort } from "./shell-sort.js";

test.each([
  { list: [5, 6, 4, 3, 7], result: [3, 4, 5, 6, 7] },
  { list: [-3, 2, 0, -4, 1, -5, 6], result: [-5, -4, -3, 0, 1, 2, 6] },
])("shellSort: $list -> $result", ({ list, result }) => {
  expect(shellSort(list)).toEqual(result);
});
