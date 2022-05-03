export function dijkstrasAlgorithm(graph, startNode, targetNode) {
  const costsAndParents = {
    [startNode]: { parent: null, cost: 0 },
  };
  const queue = [startNode];
  const processed = new Set();

  while (queue.length) {
    const node = queue.shift();
    const siblings = graph[node];

    if (processed.has(node)) continue;
    else processed.add(node);

    for (const [sibling, siblingCost] of Object.entries(siblings)) {
      if (!costsAndParents[sibling] || costsAndParents[node].cost + siblingCost < costsAndParents[sibling].cost) {
        costsAndParents[sibling] = {
          parent: node,
          cost: costsAndParents[node].cost + siblingCost,
        };
      }

      queue.push(sibling);
    }
  }

  if (!costsAndParents[targetNode]) return false;

  return getPathAndCost(targetNode, costsAndParents);
}

function getPathAndCost(targetNode, costsAndParents) {
  const result = { path: [targetNode], cost: costsAndParents[targetNode].cost };
  const queue = [targetNode];

  while (queue.length) {
    const node = queue.shift();
    const { parent } = costsAndParents[node];

    if (parent) {
      result.path.push(parent);
      queue.push(parent);
    }
  }

  result.path.reverse();
  return result;
}
