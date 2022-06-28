import { RED_BLACK_TREE_COLOR_PROP, RED_BLACK_TREE_COLORS, RedBlackTree } from "./red-black-tree";

describe("keeps balance after insertion", () => {
  describe("uncle is black", () => {
    test.each([
      {
        title: "simple case",
        nodesToInsert: [10, 8, 6],
        expectedTree: {
          8: {
            left: 6,
            right: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          6: {
            parent: 8,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          10: {
            parent: 8,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "deeper in tree",
        nodesToInsert: [10, 6, 12, 4, 2],
        expectedTree: {
          10: {
            left: 4,
            right: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          4: {
            parent: 10,
            left: 2,
            right: 6,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          12: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          2: {
            parent: 4,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          6: {
            parent: 4,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "when left node has right child",
        nodesToInsert: [12, 8, 14, 6, 10, 4, 2, 0],
        expectedTree: {
          8: {
            left: 4,
            right: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          4: {
            parent: 8,
            left: 2,
            right: 6,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          12: {
            parent: 8,
            left: 10,
            right: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          2: {
            parent: 4,
            left: 0,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          6: {
            parent: 4,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          14: {
            parent: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          0: {
            parent: 2,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
    ])("LL rotation ($title)", ({ nodesToInsert, expectedTree }) => {
      const redBlackTree = new RedBlackTree();

      for (const value of nodesToInsert) {
        redBlackTree.insert(value);
      }

      expect(redBlackTree.toObject()).toEqual(expectedTree);
    });

    test.each([
      {
        title: "simple case",
        nodesToInsert: [10, 6, 8],
        expectedTree: {
          8: {
            left: 6,
            right: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          6: {
            parent: 8,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          10: {
            parent: 8,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "deeper in tree",
        nodesToInsert: [10, 6, 12, 2, 4],
        expectedTree: {
          10: {
            left: 4,
            right: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          4: {
            parent: 10,
            left: 2,
            right: 6,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          12: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          2: {
            parent: 4,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          6: {
            parent: 4,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "when left-right node has right child",
        nodesToInsert: [20, 10, 24, 12, 8, 14, 16, 18],
        expectedTree: {
          14: {
            left: 10,
            right: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 14,
            left: 8,
            right: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          20: {
            parent: 14,
            left: 16,
            right: 24,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          8: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          12: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          16: {
            parent: 20,
            right: 18,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          24: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          18: {
            parent: 16,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
    ])("LR rotation ($title)", ({ nodesToInsert, expectedTree }) => {
      const redBlackTree = new RedBlackTree();

      for (const value of nodesToInsert) {
        redBlackTree.insert(value);
      }

      expect(redBlackTree.toObject()).toEqual(expectedTree);
    });

    test.each([
      {
        title: "simple case",
        nodesToInsert: [10, 12, 14],
        expectedTree: {
          12: {
            left: 10,
            right: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          14: {
            parent: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "deeper in tree",
        nodesToInsert: [10, 12, 8, 14, 16],
        expectedTree: {
          10: {
            left: 8,
            right: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          8: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          14: {
            parent: 10,
            left: 12,
            right: 16,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          12: {
            parent: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          16: {
            parent: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "when right node has left child",
        nodesToInsert: [10, 14, 8, 12, 16, 18, 20, 22],
        expectedTree: {
          14: {
            left: 10,
            right: 18,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 14,
            left: 8,
            right: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          18: {
            parent: 14,
            left: 16,
            right: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          8: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          12: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          16: {
            parent: 18,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          20: {
            parent: 18,
            right: 22,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          22: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
    ])("RR rotation ($title)", ({ nodesToInsert, expectedTree }) => {
      const redBlackTree = new RedBlackTree();

      for (const value of nodesToInsert) {
        redBlackTree.insert(value);
      }

      expect(redBlackTree.toObject()).toEqual(expectedTree);
    });

    test.each([
      {
        title: "simple case",
        nodesToInsert: [10, 14, 12],
        expectedTree: {
          12: {
            left: 10,
            right: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          14: {
            parent: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "deeper in tree",
        nodesToInsert: [10, 12, 8, 16, 14],
        expectedTree: {
          10: {
            left: 8,
            right: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          8: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          14: {
            parent: 10,
            left: 12,
            right: 16,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          12: {
            parent: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          16: {
            parent: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "when right-left node has left child",
        nodesToInsert: [10, 20, 8, 18, 24, 16, 14, 12],
        expectedTree: {
          16: {
            left: 10,
            right: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 16,
            left: 8,
            right: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          20: {
            parent: 16,
            left: 18,
            right: 24,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          8: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          14: {
            parent: 10,
            left: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          18: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          24: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          12: {
            parent: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
    ])("RL rotation ($title)", ({ nodesToInsert, expectedTree }) => {
      const redBlackTree = new RedBlackTree();

      for (const value of nodesToInsert) {
        redBlackTree.insert(value);
      }

      expect(redBlackTree.toObject()).toEqual(expectedTree);
    });
  });

  describe("when uncle is red", () => {
    test.each([
      {
        title: "root remains black",
        nodesToInsert: [10, 8, 12, 14],
        expectedTree: {
          10: {
            left: 8,
            right: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          8: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          12: {
            parent: 10,
            right: 14,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          14: {
            parent: 12,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "double",
        nodesToInsert: [10, 6, 4, 8, 2, 20, 18, 26, 16, 24, 28, 22],
        expectedTree: {
          10: {
            left: 6,
            right: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          6: {
            parent: 10,
            left: 4,
            right: 8,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          20: {
            parent: 10,
            left: 18,
            right: 26,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          4: {
            parent: 6,
            left: 2,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          8: {
            parent: 6,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          2: {
            parent: 4,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          18: {
            parent: 20,
            left: 16,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          16: {
            parent: 18,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          26: {
            parent: 20,
            left: 24,
            right: 28,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          24: {
            parent: 26,
            left: 22,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          28: {
            parent: 26,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          22: {
            parent: 24,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
    ])("color flip ($title)", ({ nodesToInsert, expectedTree }) => {
      const redBlackTree = new RedBlackTree();

      for (const value of nodesToInsert) {
        redBlackTree.insert(value);
      }

      expect(redBlackTree.toObject()).toEqual(expectedTree);
    });
  });
});

describe("keeps balance after removal", () => {
  describe("node is red", () => {
    test.each([
      {
        title: "doesn't have children",
        nodesToInsert: [20, 10, 30],
        nodesToRemove: [30],
        expectedTree: {
          20: {
            left: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "has children",
        nodesToInsert: [20, 10, 30, 25, 40, 35],
        nodesToRemove: [30],
        expectedTree: {
          20: {
            left: 10,
            right: 35,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          35: {
            parent: 20,
            left: 25,
            right: 40,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          25: {
            parent: 35,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          40: {
            parent: 35,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
        },
      },
    ])("$title", ({ nodesToInsert, nodesToRemove, expectedTree }) => {
      const redBlackTree = new RedBlackTree();

      for (const nodeToInsert of nodesToInsert) {
        redBlackTree.insert(nodeToInsert);
      }

      for (const nodeToRemove of nodesToRemove) {
        redBlackTree.remove(nodeToRemove);
      }

      expect(redBlackTree.toObject()).toEqual(expectedTree);
    });
  });

  describe("node is black", () => {
    test.each([
      {
        title: "has one child",
        nodesToInsert: [20, 10, 30, 25],
        nodesToRemove: [30],
        expectedTree: {
          20: {
            left: 10,
            right: 25,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          25: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
        },
      },
      {
        title: "case 2",
        tree: {
          20: {
            left: 10,
            right: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 20,
            left: 5,
            right: 15,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          30: {
            parent: 20,
            left: 25,
            right: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          5: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          15: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          25: {
            parent: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          50: {
            parent: 30,
            left: 40,
            right: 60,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          40: {
            parent: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          60: {
            parent: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
        },
        nodesToRemove: [25],
        expectedTree: {
          20: {
            left: 10,
            right: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 20,
            left: 5,
            right: 15,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          50: {
            parent: 20,
            left: 30,
            right: 60,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          5: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          15: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          30: {
            parent: 50,
            right: 40,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          60: {
            parent: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          40: {
            parent: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "case 3 (-> case 1)",
        nodesToInsert: [20, 10, 30],
        nodesToRemove: [10],
        expectedTree: {
          20: {
            right: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          30: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "case 3 (-> case 5)",
        tree: {
          20: {
            left: 10,
            right: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 20,
            left: 5,
            right: 15,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          50: {
            parent: 20,
            left: 30,
            right: 60,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          5: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          15: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          30: {
            parent: 50,
            left: 25,
            right: 40,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
          60: {
            parent: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          25: {
            parent: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          40: {
            parent: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
        },
        nodesToRemove: [5],
        expectedTree: {
          30: {
            left: 20,
            right: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          20: {
            parent: 30,
            left: 10,
            right: 25,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          50: {
            parent: 30,
            left: 40,
            right: 60,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 20,
            right: 15,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          25: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          40: {
            parent: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          60: {
            parent: 50,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          15: {
            parent: 10,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "case 4",
        nodesToInsert: [20, 10, 25, 30, 40],
        nodesToRemove: [25],
        expectedTree: {
          20: {
            left: 10,
            right: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          10: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          30: {
            parent: 20,
            right: 40,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          40: {
            parent: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
      {
        title: "case 6",
        nodesToInsert: [20, 10, 30, 25, 40],
        nodesToRemove: [10],
        expectedTree: {
          30: {
            left: 20,
            right: 40,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          20: {
            parent: 30,
            right: 25,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          40: {
            parent: 30,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.BLACK },
          },
          25: {
            parent: 20,
            meta: { [RED_BLACK_TREE_COLOR_PROP]: RED_BLACK_TREE_COLORS.RED },
          },
        },
      },
    ])("$title", ({ tree, nodesToInsert, nodesToRemove, expectedTree }) => {
      const redBlackTree = new RedBlackTree();

      if (tree) {
        redBlackTree.fromObject(tree);
      } else {
        for (const nodeToInsert of nodesToInsert) {
          redBlackTree.insert(nodeToInsert);
        }
      }

      for (const nodeToRemove of nodesToRemove) {
        redBlackTree.remove(nodeToRemove);
      }

      expect(redBlackTree.toObject()).toEqual(expectedTree);
    });
  });
});
