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
      node.left.parent = node;
      delete nodeLeft.right;
    }

    nodeLeft.right = node;
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
      delete nodeRight.parent;
    }

    if (nodeRight.left) {
      node.right = nodeRight.left;
      node.right.parent = node;
      delete nodeRight.left;
    }

    nodeRight.left = node;
    nodeRight.left.parent = nodeRight;
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

    this.rotateRightRight(node);
  }
}
