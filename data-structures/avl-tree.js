import { BinarySearchTree } from "./binary-search-tree";

export class AVLTree extends BinarySearchTree {
  insert(value) {
    super.insert(value);

    let currentNode = this.root.findNode(value);
    while (currentNode) {
      this.balance(currentNode);
      currentNode = currentNode.parent;
    }
  }

  remove(value) {
    super.remove(value);
    this.balance(this.root);
  }

  balance(node) {
    if (node.balanceFactor > 1) {
      if (node.left.balanceFactor > 0) {
        this.rotateLeftLeft(node);
      } else if (node.left.balanceFactor < 0) {
        this.rotateLeftRight(node);
      }
    } else if (node.balanceFactor < -1) {
      if (node.right.balanceFactor < 0) {
        this.rotateRightRight(node);
      } else if (node.right.balanceFactor > 0) {
        this.rotateRightLeft(node);
      }
    }
  }

  rotateLeftLeft(node) {
    const nodeLeft = node.left;
    delete node.left;

    if (node.parent) {
      node.parent.left = nodeLeft;
      nodeLeft.parent = node.parent;
      node.parent = nodeLeft;
    } else {
      this.root = nodeLeft;
    }

    if (nodeLeft.right) {
      node.left = nodeLeft.right;
      delete nodeLeft.right;
    }

    nodeLeft.right = node;
  }

  rotateLeftRight(node) {
    const nodeLeft = node.left;
    delete node.left;

    const nodeLeftRight = nodeLeft.right;
    delete nodeLeft.right;

    node.left = nodeLeftRight;
    nodeLeftRight.left = nodeLeft;

    this.rotateLeftLeft(node);
  }

  rotateRightRight(node) {
    const nodeRight = node.right;
    delete node.right;

    if (node.parent) {
      node.parent.right = nodeRight;
      nodeRight.parent = node.parent;
      node.parent = nodeRight;
    } else {
      this.root = nodeRight;
    }

    if (nodeRight.left) {
      node.right = nodeRight.left;
    }

    nodeRight.left = node;
  }

  rotateRightLeft(node) {
    const nodeRight = node.right;
    delete node.right;

    const nodeRightLeft = nodeRight.left;
    delete nodeRight.left;

    node.right = nodeRightLeft;
    nodeRightLeft.right = nodeRight;

    this.rotateRightRight(node);
  }
}
