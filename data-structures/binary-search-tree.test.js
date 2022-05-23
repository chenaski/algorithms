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
    7: { left: 6, right: 10 },
    10: { left: 9, right: 20 },
    3: { left: 2, right: 4 },
    6: {},
    9: {},
    20: { left: 18 },
    18: {},
    4: {},
    2: { left: 1 },
    1: {},
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
      7: { left: 6, right: 10 },
      10: { right: 20 },
      3: { left: 2, right: 4 },
      6: {},
      20: { left: 18 },
      18: {},
      4: {},
      2: {},
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
      7: { left: 6, right: 10 },
      10: { left: 9, right: 18 },
      3: { left: 1, right: 4 },
      6: {},
      9: {},
      18: {},
      4: {},
      1: {},
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
      7: { left: 6, right: 18 },
      6: {},
      9: {},
      20: {},
      18: { left: 9, right: 20 },
      4: { left: 2 },
      2: { left: 1 },
      1: {},
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
      7: { right: 10 },
      10: { left: 9, right: 20 },
      3: { left: 2, right: 4 },
      6: { left: 3, right: 7 },
      9: {},
      20: { left: 18 },
      18: {},
      4: {},
      2: { left: 1 },
      1: {},
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

test("calculates height of tree", () => {
  expect(bst.root.height).toEqual(4);
  expect(bst.root.left).toEqual(2);
  expect(bst.root.right).toEqual(3);
  expect(bst.root.right.left).toEqual(0);
});
