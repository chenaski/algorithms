import { AVLTree } from "./avl-tree";

describe("keeps balance after insertion", () => {
  test.each([
    {
      title: "with root node change",
      fixtures: [5, 7, 9],
      expectedTree: {
        7: { left: 5, right: 9 },
        5: { parent: 7 },
        9: { parent: 7 },
      },
    },
    {
      title: "deeper in tree",
      fixtures: [5, 7, 3, 9, 11],
      expectedTree: {
        5: { left: 3, right: 9 },
        9: { left: 7, right: 11, parent: 5 },
        7: { parent: 9 },
        11: { parent: 9 },
        3: { parent: 5 },
      },
    },
    {
      title: "when right node has child",
      fixtures: [5, 9, 3, 7, 11, 13],
      expectedTree: {
        9: { left: 5, right: 11 },
        5: { left: 3, right: 7, parent: 9 },
        11: { right: 13, parent: 9 },
        3: { parent: 5 },
        7: { parent: 5 },
        13: { parent: 11 },
      },
    },
  ])("right-right rotation ($title)", ({ fixtures, expectedTree }) => {
    const avlTree = new AVLTree();

    for (const fixture of fixtures) {
      avlTree.insert(fixture);
    }

    expect(avlTree.toObject()).toEqual(expectedTree);
  });

  test.each([
    {
      title: "with root node change",
      fixtures: [5, 9, 7],
      expectedTree: {
        7: { left: 5, right: 9 },
        5: { parent: 7 },
        9: { parent: 7 },
      },
    },
    {
      title: "deeper in tree",
      fixtures: [5, 7, 3, 11, 9],
      expectedTree: {
        5: { left: 3, right: 9 },
        9: { left: 7, right: 11, parent: 5 },
        3: { parent: 5 },
        7: { parent: 9 },
        11: { parent: 9 },
      },
    },
    {
      title: "when right-left node has right child",
      fixtures: [5, 11, 3, 7, 13, 9],
      expectedTree: {
        7: { left: 5, right: 11 },
        5: { left: 3, parent: 7 },
        11: { left: 9, right: 13, parent: 7 },
        3: { parent: 5 },
        9: { parent: 11 },
        13: { parent: 11 },
      },
    },
  ])("right-left rotation ($title)", ({ fixtures, expectedTree }) => {
    const avlTree = new AVLTree();

    for (const fixture of fixtures) {
      avlTree.insert(fixture);
    }

    expect(avlTree.toObject()).toEqual(expectedTree);
  });

  test.each([
    {
      title: "with root node change",
      fixtures: [7, 5, 3],
      expectedTree: {
        5: { left: 3, right: 7 },
        3: { parent: 5 },
        7: { parent: 5 },
      },
    },
    {
      title: "deeper in tree",
      fixtures: [7, 5, 9, 3, 1],
      expectedTree: {
        7: { left: 3, right: 9 },
        3: { left: 1, right: 5, parent: 7 },
        1: { parent: 3 },
        5: { parent: 3 },
        9: { parent: 7 },
      },
    },
    {
      title: "when left node has child",
      fixtures: [9, 5, 11, 7, 3, 1],
      expectedTree: {
        5: { left: 3, right: 9 },
        9: { left: 7, right: 11, parent: 5 },
        3: { left: 1, parent: 5 },
        1: { parent: 3 },
        7: { parent: 9 },
        11: { parent: 9 },
      },
    },
  ])("left-left rotation ($title)", ({ fixtures, expectedTree }) => {
    const avlTree = new AVLTree();

    for (const fixture of fixtures) {
      avlTree.insert(fixture);
    }

    expect(avlTree.toObject()).toEqual(expectedTree);
  });

  test.each([
    {
      title: "with root node change",
      fixtures: [7, 3, 5],
      expectedTree: {
        5: { left: 3, right: 7 },
        3: { parent: 5 },
        7: { parent: 5 },
      },
    },
    {
      title: "deeper in tree",
      fixtures: [7, 5, 9, 1, 3],
      expectedTree: {
        7: { left: 3, right: 9 },
        3: { left: 1, right: 5, parent: 7 },
        1: { parent: 3 },
        5: { parent: 3 },
        9: { parent: 7 },
      },
    },
    {
      title: "when left-right node has left child",
      fixtures: [9, 11, 3, 7, 1, 5],
      expectedTree: {
        7: { left: 3, right: 9 },
        9: { right: 11, parent: 7 },
        3: { left: 1, right: 5, parent: 7 },
        1: { parent: 3 },
        5: { parent: 3 },
        11: { parent: 9 },
      },
    },
  ])("left-right rotation ($title)", ({ fixtures, expectedTree }) => {
    const avlTree = new AVLTree();

    for (const fixture of fixtures) {
      avlTree.insert(fixture);
    }

    expect(avlTree.toObject()).toEqual(expectedTree);
  });
});

test.each([
  {
    title: "right side",
    fixtures: [5, 7, 3, 9, 11],
    valuesToRemove: [7, 3],
    expectedTree: {
      9: { left: 5, right: 11 },
      5: { parent: 9 },
      11: { parent: 9 },
    },
  },
  {
    title: "left side",
    fixtures: [7, 5, 9, 3, 1],
    valuesToRemove: [5, 9],
    expectedTree: {
      3: { left: 1, right: 7 },
      1: { parent: 3 },
      7: { parent: 3 },
    },
  },
])("keeps balance after removal ($title)", ({ fixtures, valuesToRemove, expectedTree }) => {
  const avlTree = new AVLTree();

  for (const fixture of fixtures) {
    avlTree.insert(fixture);
  }

  for (const value of valuesToRemove) {
    avlTree.remove(value);
  }

  expect(avlTree.toObject()).toEqual(expectedTree);
});
