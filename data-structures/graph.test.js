import { Graph } from "./graph.js";

// https://excalidraw.com/#json=zEEfMm0CFsOb7iVR_fnt3,lFZ0-SL7WujSQLLUzTiQBQ
const graphNodes = [
  {
    key: "a",
    value: 1,
    edges: ["b", "c", "d"],
  },
  {
    key: "b",
    value: 2,
    edges: ["c", "e"],
  },
  {
    key: "c",
    value: 3,
    edges: ["f"],
  },
  {
    key: "d",
    value: 4,
    edges: ["b", "e"],
  },
  {
    key: "e",
    value: 5,
    edges: ["g", "f"],
  },
  {
    key: "f",
    value: 6,
    edges: [],
  },
  {
    key: "g",
    value: 7,
    edges: [],
  },
];
const graphAsObject = Object.fromEntries(
  graphNodes.map((node) => [node.key, { value: node.value, edges: node.edges }])
);

test("insertion", () => {
  const graph = new Graph();

  expect(Object.keys(graph.getNodes())).toHaveLength(0);

  graph.addNode("a", 1);

  expect(Object.keys(graph.getNodes())).toHaveLength(1);
  expect(graph.hasNode("a")).toEqual(true);
  expect(graph.hasNode("b")).toEqual(false);

  expect(graph.getNode("a").value).toEqual(1);
  expect(graph.getNode("a").edges.size()).toEqual(0);

  graph.addNode("b", 2);

  expect(Object.keys(graph.getNodes())).toHaveLength(2);
  expect(graph.hasNode("b")).toEqual(true);

  expect(graph.getNode("b").value).toEqual(2);
  expect(graph.getNode("a").edges.size()).toEqual(0);

  graph.addEdge("a", "b");

  expect(graph.getNode("a").edges.size()).toEqual(1);
  expect(graph.getNode("b").edges.size()).toEqual(0);

  expect(graph.getNode("a").edges.shift().value).toEqual(2);
});

test("removal", () => {
  const graph = new Graph();

  graph.addNode("a", 1);
  graph.addNode("b", 2);
  graph.addNode("c", 3);

  graph.addEdge("a", "b");
  graph.addEdge("a", "c");
  graph.addEdge("c", "b");

  graph.removeNode("b");

  expect(Object.keys(graph.getNodes())).toHaveLength(2);
  expect(graph.hasNode("b")).toEqual(false);
  expect(graph.getNode("a").edges.size()).toEqual(1);
  expect(graph.getNode("c").edges.size()).toEqual(0);
});

test("bfs", () => {
  const graph = new Graph();

  graph.fromObject(graphAsObject);

  const result = graph.bfs(7, graph.getNode("a"));

  expect(result.key).toEqual("g");
  expect(result.value).toEqual(7);
});

test("dfs", () => {
  const graph = new Graph();

  graph.fromObject(graphAsObject);

  const result = graph.dfs(7, graph.getNode("a"));

  expect(result.key).toEqual("g");
  expect(result.value).toEqual(7);
});

test("toObject", () => {
  const graph = new Graph();

  graphNodes.forEach((node) => {
    graph.addNode(node.key, node.value);
  });

  graphNodes.forEach((node) => {
    node.edges.forEach((edge) => graph.addEdge(node.key, edge));
  });

  expect(graph.toObject()).toEqual(graphAsObject);
});

test("fromObject", () => {
  const graph = new Graph();

  graph.fromObject(graphAsObject);

  graphNodes.forEach((node) => {
    expect(graph.hasNode(node.key)).toEqual(true);

    const graphNode = graph.getNode(node.key);

    expect(graphNode.toObject()).toEqual({ value: node.value, edges: node.edges });
  });
});
