import { breadthFirstSearch } from "./breadth-first-search.js";

// https://excalidraw.com/#json=gAqGKz_BDHaJHGA-i4exT,HNBAzEhUR1MkTT5V_V5JKA
const graph = {
  1: [2, 3, 4],
  2: [3, 5],
  3: [6],
  4: [2, 5],
  5: [6, 7],
  6: [],
};

test.each([
  { graph, target: 1, startNode: 1, expectedResult: [1, 1] },
  { graph, target: 6, startNode: 1, expectedResult: [6, 6] },
  { graph, target: 7, startNode: 1, expectedResult: [7, 7] },
  { graph, target: 6, startNode: 4, expectedResult: [6, 5] },
  { graph, target: 8, startNode: 1, expectedResult: [false, 8] },
])("breadthFirstSearch: target: $target, expected: $expectedResult", ({ graph, target, startNode, expectedResult }) => {
  expect(breadthFirstSearch(graph, target, startNode)).toEqual(expectedResult);
});
