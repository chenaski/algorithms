import { PriorityQueue } from "./priority-queue";

let priorityQueue;

beforeEach(() => {
  priorityQueue = new PriorityQueue({ isItemsEqual: (item1, item2) => item1.value === item2.value });
});

it("items are correctly added and removed", () => {
  const fixtures = [
    [{ value: 1 }, 3],
    [{ value: 2 }, 1],
    [{ value: 4 }, 5],
    [{ value: 5 }, 1],
    [{ value: 6 }, 4],
  ];

  expect(priorityQueue.size()).toEqual(0);
  expect(priorityQueue.has(fixtures[0][0])).toEqual(false);

  for (const [item, priority] of fixtures) {
    priorityQueue.add(item, priority);
  }

  expect(priorityQueue.size()).toEqual(fixtures.length);

  for (const [item] of fixtures) {
    expect(priorityQueue.has(item)).toEqual(true);
  }

  for (const [item] of fixtures) {
    expect(priorityQueue.remove(item)).toEqual(true);
    expect(priorityQueue.has(item)).toEqual(false);
  }

  expect(priorityQueue.size()).toEqual(0);
});

it("items are polled in order of priority", () => {
  const fixtures = [
    [{ value: 1 }, 3],
    [{ value: 2 }, 1],
    [{ value: 3 }, 2],
    [{ value: 4 }, 5],
    [{ value: 5 }, 1],
    [{ value: 6 }, 4],
  ];
  const expectedOrder = [...fixtures].sort((item1, item2) => item2[1] - item1[1]);

  for (const [item, priority] of fixtures) {
    priorityQueue.add(item, priority);
  }

  for (const expectedItem of expectedOrder) {
    expect(priorityQueue.poll()).toEqual(expectedItem);
  }
});
