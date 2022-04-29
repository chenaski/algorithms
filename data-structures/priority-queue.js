export class PriorityQueue {
  #queue = [];

  constructor({ isItemsEqual }) {
    this.isItemsEqual = isItemsEqual;
  }

  add(item, priority) {
    this.#queue.push({ priority, item });
  }

  has(item) {
    return !!this.#queue.find(({ item: item2 }) => this.isItemsEqual(item, item2));
  }

  size() {
    return this.#queue.length;
  }

  poll() {
    if (!this.#queue.length) return null;
    const index = this.#queue.reduce((prevIndex, { priority }, index) => {
      return prevIndex === null || priority > this.#queue[prevIndex].priority ? index : prevIndex;
    }, null);
    const [{ item, priority }] = this.#queue.splice(index, 1);
    return [item, priority];
  }

  remove(item) {
    const itemToRemoveIndex = this.#queue.findIndex(({ item: item2 }) => this.isItemsEqual(item, item2));
    if (itemToRemoveIndex < 0) return false;
    this.#queue.splice(itemToRemoveIndex, 1);
    return true;
  }
}
