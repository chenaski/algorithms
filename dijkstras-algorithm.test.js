import { dijkstrasAlgorithm } from "./dijkstras-algorithm.js";

const graph1 = {
  book: {
    record: 5,
    poster: 0,
  },
  record: {
    "bass-guitar": 15,
    drums: 20,
  },
  poster: {
    "bass-guitar": 30,
    drums: 35,
  },
  "bass-guitar": { piano: 20 },
  drums: { piano: 10 },
  piano: {},
};
const graph2 = {
  1: {
    2: 5,
    3: 2,
  },
  2: {
    4: 2,
    5: 4,
  },
  3: {
    2: 8,
    4: 7,
  },
  4: {
    6: 1,
  },
  5: {
    4: 6,
    6: 3,
  },
  6: {},
};
const graph3 = {
  1: { 2: 10 },
  2: { 3: 20 },
  3: { 4: 1, 5: 30 },
  4: { 3: 1 },
  5: {},
};
const graph4 = {
  1: { 2: 2, 3: 2 },
  2: { 4: 2, 5: 2 },
  3: { 2: 2 },
  4: { 3: -1, 5: 2 },
  5: {},
};

test.each([
  {
    graph: graph1,
    startNode: "book",
    targetNode: "piano",
    result: { path: ["book", "record", "drums", "piano"], cost: 35 },
  },
  {
    graph: { ...graph1, "bass-guitar": { piano: 15 } },
    startNode: "book",
    targetNode: "piano",
    result: { path: ["book", "record", "bass-guitar", "piano"], cost: 35 },
  },
  {
    graph: graph2,
    startNode: "1",
    targetNode: "6",
    result: { path: ["1", "2", "4", "6"], cost: 8 },
  },
  {
    graph: graph3,
    startNode: "1",
    targetNode: "5",
    result: { path: ["1", "2", "3", "5"], cost: 60 },
  },
  {
    graph: graph4,
    startNode: "1",
    targetNode: "5",
    result: { path: ["1", "2", "5"], cost: 4 },
  },
])("dijkstrasAlgorithm, path: $result.path", ({ graph, startNode, targetNode, result }) => {
  expect(dijkstrasAlgorithm(graph, startNode, targetNode)).toEqual(result);
});
