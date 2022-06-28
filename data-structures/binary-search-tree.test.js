import { BinarySearchTree } from "./binary-search-tree";

const fixtures = [5, 7, 10, 3, 6, 9, 20, 18, 4, 2, 1];

let bst;

beforeEach(() => {
  bst = new BinarySearchTree();

  for (const fixture of fixtures) {
    bst.insert(fixture);
  }
});

test("inserts", () => {
  const expectedTree = {
    5: { left: 3, right: 7 },
    7: { left: 6, right: 10, parent: 5 },
    10: { left: 9, right: 20, parent: 7 },
    3: { left: 2, right: 4, parent: 5 },
    6: { parent: 7 },
    9: { parent: 10 },
    20: { left: 18, parent: 10 },
    18: { parent: 20 },
    4: { parent: 3 },
    2: { left: 1, parent: 3 },
    1: { parent: 2 },
  };

  expect(bst.toObject()).toEqual(expectedTree);
});

test("contains", () => {
  for (const fixture of fixtures) {
    expect(bst.contains(fixture));
  }
});

describe("remove", () => {
  test("leaves", () => {
    const leavesToRemove = [1, 9];
    const expectedTree = {
      5: { left: 3, right: 7 },
      7: { left: 6, right: 10, parent: 5 },
      10: { right: 20, parent: 7 },
      3: { left: 2, right: 4, parent: 5 },
      6: { parent: 7 },
      20: { left: 18, parent: 10 },
      18: { parent: 20 },
      4: { parent: 3 },
      2: { parent: 3 },
    };

    for (const value of leavesToRemove) {
      bst.remove(value);
    }

    for (const value of leavesToRemove) {
      expect(bst.contains(value)).toEqual(false);
    }

    expect(bst.toObject()).toEqual(expectedTree);
  });

  test("node with 1 child", () => {
    const leavesToRemove = [2, 20];
    const expectedTree = {
      5: { left: 3, right: 7 },
      7: { left: 6, right: 10, parent: 5 },
      10: { left: 9, right: 18, parent: 7 },
      3: { left: 1, right: 4, parent: 5 },
      6: { parent: 7 },
      9: { parent: 10 },
      18: { parent: 10 },
      4: { parent: 3 },
      1: { parent: 3 },
    };

    for (const value of leavesToRemove) {
      bst.remove(value);
    }

    for (const value of leavesToRemove) {
      expect(bst.contains(value)).toEqual(false);
    }

    expect(bst.toObject()).toEqual(expectedTree);
  });

  test("node with 2 children", () => {
    const leavesToRemove = [3, 10];
    const expectedTree = {
      5: { left: 4, right: 7 },
      7: { left: 6, right: 18, parent: 5 },
      6: { parent: 7 },
      9: { parent: 18 },
      20: { parent: 18 },
      18: { left: 9, right: 20, parent: 7 },
      4: { left: 2, parent: 5 },
      2: { left: 1, parent: 4 },
      1: { parent: 2 },
    };

    for (const value of leavesToRemove) {
      bst.remove(value);
    }

    for (const value of leavesToRemove) {
      expect(bst.contains(value)).toEqual(false);
    }

    expect(bst.toObject()).toEqual(expectedTree);
  });

  test("root node", () => {
    const leavesToRemove = [5];
    const expectedTree = {
      6: { left: 3, right: 7 },
      7: { right: 10, parent: 6 },
      10: { left: 9, right: 20, parent: 7 },
      3: { left: 2, right: 4, parent: 6 },
      9: { parent: 10 },
      20: { left: 18, parent: 10 },
      18: { parent: 20 },
      4: { parent: 3 },
      2: { left: 1, parent: 3 },
      1: { parent: 2 },
    };

    for (const value of leavesToRemove) {
      bst.remove(value);
    }

    for (const value of leavesToRemove) {
      expect(bst.contains(value)).toEqual(false);
    }

    expect(bst.toObject()).toEqual(expectedTree);
  });
});

describe("traversal", () => {
  test("in order", () => {
    const expectedOrder = [...fixtures].sort((a, b) => a - b);

    let i = 0;
    bst.inOrderTraversal((value) => {
      expect(value).toEqual(expectedOrder[i]);
      i++;
    });
  });

  test("pre order", () => {
    const expectedOrder = [5, 3, 2, 1, 4, 7, 6, 10, 9, 20, 18];

    let i = 0;
    bst.preOrderTraversal((value) => {
      expect(value).toEqual(expectedOrder[i]);
      i++;
    });
  });

  test("post order", () => {
    const expectedOrder = [1, 2, 4, 3, 6, 9, 18, 20, 10, 7, 5];

    let i = 0;
    bst.postOrderTraversal((value) => {
      expect(value).toEqual(expectedOrder[i]);
      i++;
    });
  });
});

test("toObject", () => {
  const expectedTree = {
    5: { left: 3, right: 7 },
    7: { left: 6, right: 10, parent: 5 },
    10: { left: 9, right: 20, parent: 7 },
    3: { left: 2, right: 4, parent: 5 },
    6: { parent: 7 },
    9: { parent: 10 },
    20: { left: 18, parent: 10 },
    18: { parent: 20 },
    4: { parent: 3 },
    2: { left: 1, parent: 3 },
    1: { parent: 2 },
  };

  expect(bst.toObject()).toEqual(expectedTree);
});

test("fromObject", () => {
  const rootNode = 5;
  const tree = {
    5: { left: 3, right: 7, meta: { id: 1 } },
    7: { left: 6, right: 10, parent: 5, meta: { id: 2 } },
    10: { left: 9, right: 20, parent: 7, meta: { id: 3 } },
    3: { left: 2, right: 4, parent: 5, meta: { id: 4 } },
    6: { parent: 7, meta: { id: 5 } },
    9: { parent: 10, meta: { id: 6 } },
    20: { left: 18, parent: 10, meta: { id: 7 } },
    18: { parent: 20, meta: { id: 8 } },
    4: { parent: 3, meta: { id: 9 } },
    2: { left: 1, parent: 3, meta: { id: 10 } },
    1: { parent: 2, meta: { id: 11 } },
  };

  bst.fromObject(tree);

  const checkNode = (node, nodeValue) => {
    const nodeAsObject = tree[nodeValue];

    expect(node.value).toEqual(nodeValue);
    expect(node.left?.value).toEqual(nodeAsObject.left);
    expect(node.right?.value).toEqual(nodeAsObject.right);
    expect(node.parent?.value).toEqual(nodeAsObject.parent);
    expect(Object.fromEntries(node.meta.entries())).toEqual(nodeAsObject.meta);

    nodeAsObject.left && checkNode(node.left, nodeAsObject.left);
    nodeAsObject.right && checkNode(node.right, nodeAsObject.right);
  };

  checkNode(bst.root, rootNode);
});

test("calculates height of tree", () => {
  const getHeight = (node) => {
    if (!node || (!node.left && !node.right)) {
      return 0;
    }

    return Math.max(getHeight(node.left), getHeight(node.right)) + 1;
  };

  bst.inOrderTraversal((_, node) => {
    expect(node.height).toEqual(getHeight(node));
  });
});
