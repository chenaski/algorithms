import {
  findSmallest,
  recursiveSelectionSearch,
  selectionSearch,
} from "./selectionSearch.js";

test.each([
  { list: [5, 3, 7], result: 1 },
  { list: [2, 0, 1], result: 1 },
  { list: [-5, 0, 5], result: 0 },
  { list: [-1, -2, -10], result: 2 },
])(
  "findSmallest: the smallest index in $list is $result",
  ({ list, result }) => {
    expect(findSmallest(list)).toEqual(result);
  }
);

const cases = [
  { list: [5, 4, 3, 2, 1], result: [1, 2, 3, 4, 5], findItem: findSmallest },
  {
    list: [3, 5, 8, 0, 4, 2, 6, 1, 9, 7],
    result: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    findItem: findSmallest,
  },
  {
    list: [-5, 10, 5, -10, 0],
    result: [-10, -5, 0, 5, 10],
    findItem: findSmallest,
  },
];
test.each(cases)(
  "selectionSearch: $list -> $result [$findItem]",
  ({ list, result, findItem }) => {
    expect(selectionSearch(list, findItem)).toEqual(result);
  }
);
test.each(cases)(
  "recursiveSelectionSearch: $list -> $result [$findItem]",
  ({ list, result, findItem }) => {
    expect(recursiveSelectionSearch(list, findItem)).toEqual(result);
  }
);
