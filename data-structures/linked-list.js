export class LinkedList {
  #head;
  #tail;

  pop() {
    return this.#tail?.value;
  }

  push(value) {
    if (!this.#tail) {
      this.#head = this.#tail = { value };
    } else {
      this.#tail.next = { value };
      this.#tail = this.#tail.next;
    }
  }

  shift() {
    return this.#head?.value;
  }

  unshift(value) {
    if (!this.#head) {
      this.#head = this.#tail = { value };
    } else {
      this.#head = { value, next: this.#head };
    }
  }

  forEach(cb) {
    let prevNode = null;
    let currentNode = this.#head;

    while (currentNode) {
      const stop = cb({ currentNode, prevNode });
      if (stop) break;
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
  }

  contains(value) {
    let found = false;

    this.forEach(({ currentNode }) => {
      if (value === currentNode.value) {
        found = true;
        return true;
      }
    });

    return found;
  }

  remove(value) {
    this.forEach(({ currentNode, prevNode }) => {
      if (currentNode.value === value) {
        if (currentNode.value === this.#head.value) {
          this.#head = this.#head.next;
        } else if (currentNode.value === this.#tail.value) {
          delete prevNode.next;
          this.#tail = prevNode;
        } else if (prevNode) {
          prevNode.next = currentNode.next;
        }
        return true;
      }
    });
  }

  reverse() {
    let newTail = this.#head;
    let newHead = null;

    this.forEach(({ currentNode }) => {
      if (!newHead) {
        newHead = currentNode;
      } else {
        newHead = { ...currentNode, next: newHead };
      }
    });

    this.#head = newHead;
    this.#tail = newTail;
  }

  toArray() {
    const values = [];

    this.forEach(({ currentNode }) => {
      values.push(currentNode.value);
    });

    return values;
  }

  size() {
    let count = 0;

    this.forEach(() => {
      count += 1;
    });

    return count;
  }
}
