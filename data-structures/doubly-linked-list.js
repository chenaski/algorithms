export class DoublyLinkedList {
  #head;
  #tail;

  get head() {
    return this.#head?.value;
  }

  get tail() {
    return this.#tail?.value;
  }

  append(value) {
    if (!this.#head) {
      this.#head = this.#tail = { value };
      return;
    }

    this.#tail.next = { value, prev: this.#tail };
    this.#tail = this.#tail.next;
  }

  prepend(value) {
    if (!this.#head) {
      this.#head = this.#tail = { value };
    }

    this.#head = { value, next: this.#head };
  }

  contains(value) {
    if (!this.#head) return false;

    let found = false;

    this.traverse((node) => {
      if (node.value !== value) return;
      found = true;
      return true;
    });

    return found;
  }

  remove(value) {
    if (!this.#head) return;
    if (this.#head.value === value) {
      this.#head = this.#head.next;
      delete this.#head.prev;
      return;
    }
    if (this.#tail.value === value) {
      this.#tail = this.#tail.prev;
      delete this.#tail.next;
      return;
    }
    this.traverse((node) => {
      if (node.value !== value) return;
      node.prev.next = node.next;
      return true;
    });
  }

  traverse(cb) {
    let currentNode = this.#head;
    let i = 0;

    while (currentNode) {
      const stop = cb(currentNode, i);
      if (stop) break;
      currentNode = currentNode.next;
      i++;
    }
  }

  reverseTraversal(cb) {
    let currentNode = this.#tail;
    let i = 0;

    while (currentNode) {
      const stop = cb(currentNode, i);
      if (stop) break;
      currentNode = currentNode.prev;
      i++;
    }
  }
}
