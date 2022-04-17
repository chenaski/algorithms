export class Heap {
  #items = [];

  constructor({ pairIsInCorrectOrder }) {
    this.pairIsInCorrectOrder = pairIsInCorrectOrder;
  }

  #getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  #getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  #getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  #hasLeftChild(parentIndex) {
    return this.#getLeftChildIndex(parentIndex) < this.#items.length;
  }
  #hasRightChild(parentIndex) {
    return this.#getRightChildIndex(parentIndex) < this.#items.length;
  }
  #hasParent(childIndex) {
    return this.#getParentIndex(childIndex) >= 0;
  }

  #leftChild(parentIndex) {
    return this.#items[this.#getLeftChildIndex(parentIndex)];
  }
  #rightChild(parentIndex) {
    return this.#items[this.#getRightChildIndex(parentIndex)];
  }
  #parent(childIndex) {
    return this.#items[this.#getParentIndex(childIndex)];
  }

  #swap(index1, index2) {
    const item = this.#items[index1];
    this.#items[index1] = this.#items[index2];
    this.#items[index2] = item;
  }

  peek() {
    return this.#items[0];
  }

  poll() {
    if (this.#items.length === 0) return null;
    else if (this.#items.length === 1) return this.#items.pop();

    const item = this.#items[0];
    this.#items[0] = this.#items.pop();
    this.heapifyDown();
    return item;
  }

  add(item) {
    this.#items.push(item);
    this.heapifyUp();
  }

  size() {
    return this.#items.length;
  }

  toString() {
    return this.#items.toString();
  }

  heapifyUp() {
    let index = this.#items.length - 1;

    while (this.#hasParent(index) && !this.pairIsInCorrectOrder(this.#parent(index), this.#items[index])) {
      this.#swap(index, this.#getParentIndex(index));
      index = this.#getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    let nextIndex = null;

    while (this.#hasLeftChild(index)) {
      if (this.#hasRightChild(index) && this.pairIsInCorrectOrder(this.#rightChild(index), this.#leftChild(index))) {
        nextIndex = this.#getRightChildIndex(index);
      } else {
        nextIndex = this.#getLeftChildIndex(index);
      }

      if (this.pairIsInCorrectOrder(this.#items[index], this.#items[nextIndex])) {
        break;
      }

      this.#swap(index, nextIndex);
      index = nextIndex;
    }
  }
}
