export function breadthFirstSearch(graph, target, startNode) {
  let queue = [startNode];
  const processed = new Set();
  let steps = 0;

  while (queue.length) {
    const currentNode = queue.shift();

    if (processed.has(currentNode)) continue;

    steps++;

    if (currentNode === target) return [currentNode, steps];

    queue = queue.concat(graph[currentNode]);

    processed.add(currentNode);
  }

  return [false, steps];
}
