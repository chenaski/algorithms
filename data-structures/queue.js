export class Queue {
  #head;
  #tail;

  isEmpty() {
    return !this.#head;
  }

  enqueue(value) {
    if (!this.#head) {
      this.#head = this.#tail = { value };
      return;
    }

    this.#tail.next = { value };
    this.#tail = this.#tail.next;
  }

  dequeue() {
    if (!this.#head) {
      return;
    }

    const value = this.#head.value;
    this.#head = this.#head.next;

    if (!this.#head) {
      this.#tail = null;
    }

    return value;
  }

  peek() {
    return this.#head.value;
  }
}
