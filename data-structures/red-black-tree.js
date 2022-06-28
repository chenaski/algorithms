import { BinarySearchTree } from "./binary-search-tree";

export const RED_BLACK_TREE_COLORS = {
  RED: "RED",
  BLACK: "BLACK",
};

export const RED_BLACK_TREE_COLOR_PROP = "color";

export class RedBlackTree extends BinarySearchTree {
  insert(value) {
    super.insert(value);

    const insertedNode = this.root.findNode(value);

    if (insertedNode.value === this.root.value) {
      this.makeNodeBlack(this.root);
    } else {
      this.makeNodeRed(insertedNode);
    }

    this.balance(insertedNode);
  }

  remove(value, rootNode = this.root) {
    if (!rootNode) return false;

    const nodeToRemove = rootNode.findNode(value);

    if (!nodeToRemove) return false;

    if (!nodeToRemove.left || !nodeToRemove.right) {
      this.removeOneChild(nodeToRemove);
    } else {
      const inorderSuccessor = nodeToRemove.right.findMin();

      nodeToRemove.value = inorderSuccessor.value;

      if (nodeToRemove.value > value) {
        this.remove(inorderSuccessor.value, nodeToRemove.right);
      } else {
        this.remove(inorderSuccessor.value, nodeToRemove.left);
      }
    }
  }

  removeOneChild(node) {
    const childNode = !node.right ? node.left : node.right;
    const siblingNode = this.findSiblingNode(node);
    const parentNode = node.parent;

    if (this.isBlackNode(node)) {
      if (childNode && this.isRedNode(childNode)) {
        this.makeNodeBlack(childNode);
      } else {
        this.removalCase1(node, siblingNode);
      }
    }

    if (childNode) {
      node.parent.replaceChild(node, childNode);
    } else {
      parentNode.removeChild(node.value);
    }
  }

  removalCase1(doubleBlackNode) {
    if (!doubleBlackNode.parent) {
      this.root = doubleBlackNode;
    } else {
      this.removalCase2(doubleBlackNode);
    }
  }

  removalCase2(doubleBlackNode) {
    const siblingNode = this.findSiblingNode(doubleBlackNode);

    if (this.isRedNode(siblingNode)) {
      this.makeNodeRed(doubleBlackNode.parent);
      this.makeNodeBlack(siblingNode);

      if (this.isLeftChild(siblingNode)) {
        this.rotateLeftLeft(doubleBlackNode.parent);
      } else {
        this.rotateRightRight(doubleBlackNode.parent);
      }
    }

    this.removalCase3(doubleBlackNode);
  }

  removalCase3(doubleBlackNode) {
    const siblingNode = this.findSiblingNode(doubleBlackNode);

    if (
      this.isBlackNode(doubleBlackNode.parent) &&
      this.isBlackNode(siblingNode) &&
      (!siblingNode.left || this.isBlackNode(siblingNode.left)) &&
      (!siblingNode.right || this.isBlackNode(siblingNode.right))
    ) {
      this.makeNodeRed(siblingNode);
      this.removalCase1(doubleBlackNode.parent);
    } else {
      this.removalCase4(doubleBlackNode);
    }
  }

  removalCase4(doubleBlackNode) {
    const siblingNode = this.findSiblingNode(doubleBlackNode);

    if (
      this.isRedNode(siblingNode.parent) &&
      this.isBlackNode(siblingNode) &&
      (!siblingNode.left || this.isBlackNode(siblingNode.left)) &&
      (!siblingNode.right || this.isBlackNode(siblingNode.right))
    ) {
      this.makeNodeRed(siblingNode);
      this.makeNodeBlack(doubleBlackNode.parent);
    } else {
      this.removalCase5(doubleBlackNode);
    }
  }

  removalCase5(doubleBlackNode) {
    const siblingNode = this.findSiblingNode(doubleBlackNode);

    if (this.isBlackNode(siblingNode)) {
      if (
        this.isLeftChild(doubleBlackNode) &&
        siblingNode.right &&
        this.isBlackNode(siblingNode.right) &&
        siblingNode.left &&
        this.isRedNode(siblingNode.left)
      ) {
        this.rotateLeftLeft(siblingNode);
      } else if (
        !this.isLeftChild(doubleBlackNode) &&
        siblingNode.left &&
        this.isBlackNode(siblingNode.left) &&
        siblingNode.right &&
        this.isRedNode(siblingNode.right)
      ) {
        this.rotateRightRight(siblingNode);
      }
    }

    this.removalCase6(doubleBlackNode);
  }

  removalCase6(doubleBlackNode) {
    const siblingNode = this.findSiblingNode(doubleBlackNode);

    this.changeNodeColor(siblingNode, siblingNode.parent);

    if (this.isLeftChild(doubleBlackNode)) {
      siblingNode.right && this.makeNodeBlack(siblingNode.right);
      this.rotateRightRight(doubleBlackNode.parent);
    } else {
      siblingNode.left && this.makeNodeBlack(siblingNode.left);
      this.rotateLeftLeft(doubleBlackNode.parent);
    }
  }

  isLeftChild(node) {
    return node.parent.left.value === node.value;
  }

  findSiblingNode(node) {
    if (!node.parent) return null;
    return node.parent.left?.value === node.value ? node.parent.right : node.parent.left;
  }

  changeNodeColor(node, targetNode) {
    node.meta.set(RED_BLACK_TREE_COLOR_PROP, targetNode.meta.get(RED_BLACK_TREE_COLOR_PROP));
  }

  makeNodeRed(node) {
    node.meta.set(RED_BLACK_TREE_COLOR_PROP, RED_BLACK_TREE_COLORS.RED);
  }

  isRedNode(node) {
    return RED_BLACK_TREE_COLORS.RED === node.meta.get(RED_BLACK_TREE_COLOR_PROP);
  }

  makeNodeBlack(node) {
    node.meta.set(RED_BLACK_TREE_COLOR_PROP, RED_BLACK_TREE_COLORS.BLACK);
  }

  isBlackNode(node) {
    return RED_BLACK_TREE_COLORS.BLACK === node.meta.get(RED_BLACK_TREE_COLOR_PROP);
  }

  balance(node) {
    if (!node || node.value === this.root.value) return;

    if (this.isBlackNode(node.parent)) return;

    const nodeGrandParent = node.parent.parent;
    const nodeUncle = node.parent.value < nodeGrandParent.value ? nodeGrandParent.right : nodeGrandParent.left;

    if (!nodeUncle || this.isBlackNode(nodeUncle)) {
      let nextNode;

      if (nodeGrandParent.left?.value === node.parent.value) {
        if (node.parent.left?.value === node.value) {
          nextNode = this.rotateLeftLeft(nodeGrandParent);
        } else {
          nextNode = this.rotateLeftRight(nodeGrandParent);
        }
      } else {
        if (node.parent.right?.value === node.value) {
          nextNode = this.rotateRightRight(nodeGrandParent);
        } else {
          nextNode = this.rotateRightLeft(nodeGrandParent);
        }
      }

      this.makeNodeBlack(nextNode);
      this.makeNodeRed(nextNode.left);
      this.makeNodeRed(nextNode.right);
      this.balance(nextNode.parent);
    } else {
      if (nodeGrandParent.value !== this.root.value) {
        this.makeNodeRed(nodeGrandParent);
      }

      this.makeNodeBlack(nodeGrandParent.left);
      this.makeNodeBlack(nodeGrandParent.right);

      this.balance(nodeGrandParent);
    }
  }

  rotateLeftLeft(node) {
    const nodeLeft = node.left;
    delete node.left;

    if (node.parent) {
      if (this.isLeftChild(node)) {
        node.parent.left = nodeLeft;
      } else {
        node.parent.right = nodeLeft;
      }

      nodeLeft.parent = node.parent;
      node.parent = nodeLeft;
    } else {
      this.root = nodeLeft;
      delete nodeLeft.parent;
    }

    if (nodeLeft.right) {
      node.left = nodeLeft.right;
      node.left.parent = node;
      delete nodeLeft.right;
    }

    nodeLeft.right = node;
    nodeLeft.right.parent = nodeLeft;

    return node.parent;
  }

  rotateLeftRight(node) {
    const nodeLeft = node.left;
    delete node.left;

    const nodeLeftRight = nodeLeft.right;
    delete nodeLeft.right;

    if (nodeLeftRight.left) {
      nodeLeft.right = nodeLeftRight.left;
      nodeLeft.right.parent = nodeLeft;
      delete nodeLeftRight.left;
    }

    node.left = nodeLeftRight;
    node.left.parent = node;

    nodeLeftRight.left = nodeLeft;
    nodeLeftRight.left.parent = nodeLeftRight;

    return this.rotateLeftLeft(node);
  }

  rotateRightRight(node) {
    const nodeRight = node.right;
    delete node.right;

    if (node.parent) {
      if (this.isLeftChild(node)) {
        node.parent.left = nodeRight;
      } else {
        node.parent.right = nodeRight;
      }

      nodeRight.parent = node.parent;
      node.parent = nodeRight;
    } else {
      this.root = nodeRight;
      delete nodeRight.parent;
    }

    if (nodeRight.left) {
      node.right = nodeRight.left;
      node.right.parent = node;
      delete nodeRight.left;
    }

    nodeRight.left = node;
    nodeRight.left.parent = nodeRight;

    return node.parent;
  }

  rotateRightLeft(node) {
    const nodeRight = node.right;
    delete node.right;

    const nodeRightLeft = nodeRight.left;
    delete nodeRight.left;

    if (nodeRightLeft.right) {
      nodeRight.left = nodeRightLeft.right;
      nodeRight.left.parent = nodeRight;
      delete nodeRightLeft.right;
    }

    node.right = nodeRightLeft;
    node.right.parent = node;

    nodeRightLeft.right = nodeRight;
    nodeRightLeft.right.parent = nodeRightLeft;

    return this.rotateRightRight(node);
  }
}
