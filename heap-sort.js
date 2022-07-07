import { Heap } from "./data-structures/heap.js";

export function heapSort(list) {
  const compare = (a, b) => {
    return a < b;
  };
  const heap = new Heap({ pairIsInCorrectOrder: compare });

  list.forEach((item) => heap.add(item));

  const result = [];

  while (heap.size() > 0) {
    result.push(heap.poll());
  }

  return result;
}
