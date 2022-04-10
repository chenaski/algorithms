import { Stack } from "./stack";

test("isEmpty", () => {
  const stack = new Stack();

  expect(stack.isEmpty()).toBe(true);
  stack.enqueue(1);
  expect(stack.isEmpty()).toBe(false);
});

test("enqueue", () => {
  const stack = new Stack();

  stack.enqueue(1);
  expect(stack.isEmpty()).toBe(false);
  expect(stack.peek()).toBe(1);
  stack.enqueue(2);
  expect(stack.peek()).toBe(2);
  stack.enqueue(3);
  expect(stack.peek()).toBe(3);
});

test("dequeue", () => {
  const stack = new Stack();

  stack.enqueue(1);
  stack.enqueue(2);
  stack.enqueue(3);

  expect(stack.dequeue()).toBe(3);
  expect(stack.dequeue()).toBe(2);
  expect(stack.dequeue()).toBe(1);
  expect(stack.isEmpty()).toBe(true);
});

test("peek", () => {
  const stack = new Stack();

  stack.enqueue(1);
  expect(stack.peek()).toBe(1);
  stack.enqueue(2);
  expect(stack.peek()).toBe(2);
  stack.enqueue(3);
  expect(stack.peek()).toBe(3);
});
