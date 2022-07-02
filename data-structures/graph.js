import { LinkedList } from "./linked-list.js";

export class GraphNode {
  key;
  value;
  edges = new LinkedList();

  constructor(key, value) {
    this.key = key;
    this.value = value;
  }

  addEdge(node) {
    this.edges.push(node);
    return true;
  }

  removeEdge(node) {
    this.edges.remove(node);
    return true;
  }

  toObject() {
    const edgesAsArray = [];

    this.edges.forEach(({ currentNode }) => {
      edgesAsArray.push(currentNode.value.key);
    });

    return { value: this.value, edges: edgesAsArray };
  }
}

export class Graph {
  #nodes = {};

  getNodes() {
    return this.#nodes;
  }

  addNode(key, value) {
    this.#nodes[key] = new GraphNode(key, value);
  }

  getNode(key) {
    return this.#nodes[key];
  }

  hasNode(key) {
    return !!this.getNode(key);
  }

  removeNode(key) {
    const nodeToRemove = this.getNode(key);

    if (!nodeToRemove) {
      return false;
    }

    Object.values(this.#nodes).forEach((node) => node.removeEdge(nodeToRemove));
    delete this.#nodes[key];
  }

  addEdge(sourceKey, destinationKey) {
    const sourceNode = this.getNode(sourceKey);
    const destinationNode = this.getNode(destinationKey);

    if (!sourceNode || !destinationNode) {
      return false;
    }

    sourceNode.addEdge(destinationNode);
  }

  removeEdge(sourceKey, destinationKey) {
    const sourceNode = this.getNode(sourceKey);
    const destinationNode = this.getNode(destinationKey);

    if (!sourceNode || !destinationNode) {
      return false;
    }

    return sourceNode.removeEdge(destinationNode);
  }

  bfs(value, startNode) {
    let queue = [startNode];
    const visitedNodes = [];

    while (queue.length) {
      const currentNode = queue.shift();

      if (visitedNodes.includes(currentNode.key)) {
        continue;
      } else if (currentNode.value === value) {
        return currentNode;
      }

      visitedNodes.push(currentNode.key);
      queue = queue.concat(currentNode.edges.toArray());
    }

    return false;
  }

  dfs(value, nextNode, visitedNodes = []) {
    if (visitedNodes.includes(nextNode.key)) {
      return false;
    } else if (nextNode.value === value) {
      return nextNode;
    }

    visitedNodes.push(nextNode.key);

    for (const node of nextNode.edges.toArray()) {
      const foundNode = this.dfs(value, node, visitedNodes);

      if (foundNode) {
        return foundNode;
      }
    }

    return false;
  }

  toObject() {
    return Object.fromEntries(
      Object.entries(this.#nodes).map(([key, node]) => {
        return [key, node.toObject()];
      })
    );
  }

  fromObject(object) {
    Object.entries(object).forEach(([key, node]) => {
      this.addNode(key, node.value);
    });

    Object.entries(object).forEach(([key, node]) => {
      node.edges.forEach((edge) => this.addEdge(key, edge));
    });
  }
}
