export class Stack {
  #top;

  isEmpty() {
    return !this.#top;
  }

  enqueue(value) {
    if (!this.#top) {
      this.#top = { value };
      return;
    }

    this.#top = { value, next: this.#top };
  }

  dequeue() {
    if (!this.#top) {
      return;
    }

    const value = this.#top.value;
    this.#top = this.#top.next;

    return value;
  }

  peek() {
    return this.#top.value;
  }
}
