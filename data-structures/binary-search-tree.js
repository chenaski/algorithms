export class BinaryNode {
  constructor(parent, value) {
    this.parent = parent;
    this.value = value;
  }

  insert(value) {
    const side = value <= this.value ? "left" : "right";

    if (this[side]) {
      this[side].insert(value);
    } else {
      this[side] = new BinaryNode(this, value);
    }
  }

  findNode(value) {
    if (value === this.value) {
      return this;
    }

    const side = value < this.value ? "left" : "right";

    return this[side]?.findNode(value);
  }

  contains(value) {
    return !!this.findNode(value);
  }

  remove(value) {
    const nodeToRemove = this.findNode(value);

    if (!nodeToRemove) {
      return false;
    }

    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (nodeToRemove.parent) {
        nodeToRemove.parent.removeChild(value);
      } else {
        nodeToRemove.value = undefined;
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin();

      if (nextBiggerNode.value === nodeToRemove.right.value) {
        nodeToRemove.value = nodeToRemove.right.value;
        nodeToRemove.right = nodeToRemove.right.right;
      } else {
        this.remove(nextBiggerNode.value);
        nodeToRemove.value = nextBiggerNode.value;
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right;

      if (nodeToRemove.parent) {
        nodeToRemove.parent.replaceChild(nodeToRemove, childNode);
      } else {
        nodeToRemove.value = childNode.value;
        nodeToRemove.left = childNode.left;
        nodeToRemove.right = childNode.right;
      }
    }
  }

  removeChild(value) {
    const side = value === this.left?.value ? "left" : value === this.right?.value ? "right" : null;

    if (side) {
      this[side] = undefined;
      return true;
    }

    return false;
  }

  replaceChild(nodeToReplace, replacementNode) {
    const side =
      this?.left.value === nodeToReplace.value ? "left" : this?.right.value === nodeToReplace.value ? "right" : null;

    if (side) {
      this[side] = replacementNode;
      return true;
    }

    return false;
  }

  findMin() {
    if (!this.left) {
      return this;
    }

    return this.left.findMin();
  }

  inOrderTraversal(cb) {
    this.left?.inOrderTraversal(cb);
    cb(this.value, this);
    this.right?.inOrderTraversal(cb);
  }

  preOrderTraversal(cb) {
    cb(this.value, this);
    this.left?.preOrderTraversal(cb);
    this.right?.preOrderTraversal(cb);
  }

  postOrderTraversal(cb) {
    this.left?.postOrderTraversal(cb);
    this.right?.postOrderTraversal(cb);
    cb(this.value, this);
  }
}

export class BinarySearchTree {
  #root;

  toObject() {
    const result = {};

    this.inOrderTraversal((_, node) => {
      result[node.value] = {};

      if (node.left) {
        result[node.value].left = node.left.value;
      }

      if (node.right) {
        result[node.value].right = node.right.value;
      }
    });

    return result;
  }

  insert(value) {
    if (!this.#root) {
      this.#root = new BinaryNode(null, value);
      return;
    }

    this.#root.insert(value);
  }

  contains(value) {
    if (!this.#root) {
      return false;
    }

    return this.#root.contains(value);
  }

  remove(value) {
    if (!this.#root) {
      return false;
    }

    return this.#root.remove(value);
  }

  inOrderTraversal(cb) {
    if (!this.#root) {
      return;
    }

    return this.#root.inOrderTraversal(cb);
  }

  preOrderTraversal(cb) {
    if (!this.#root) {
      return;
    }

    return this.#root.preOrderTraversal(cb);
  }

  postOrderTraversal(cb) {
    if (!this.#root) {
      return;
    }

    return this.#root.postOrderTraversal(cb);
  }
}