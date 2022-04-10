import { Queue } from "./queue";

test("isEmpty", () => {
  const queue = new Queue();

  expect(queue.isEmpty()).toBe(true);

  queue.enqueue(1);

  expect(queue.isEmpty()).toBe(false);
});

test("enqueue", () => {
  const queue = new Queue();

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  expect(queue.isEmpty()).toBe(false);
  expect(queue.dequeue()).toBe(1);
  expect(queue.dequeue()).toBe(2);
  expect(queue.dequeue()).toBe(3);
  expect(queue.isEmpty()).toBe(true);
});

test("dequeue", () => {
  const queue = new Queue();

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  expect(queue.dequeue()).toBe(1);
  expect(queue.dequeue()).toBe(2);
  expect(queue.dequeue()).toBe(3);
  expect(queue.isEmpty()).toBe(true);
});

test("peek", () => {
  const queue = new Queue();

  queue.enqueue(1);
  expect(queue.peek()).toBe(1);
  queue.enqueue(2);
  expect(queue.peek()).toBe(1);
  queue.enqueue(3);
  expect(queue.peek()).toBe(1);
});
