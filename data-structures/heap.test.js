import { Heap } from "./heap";

describe("MinHeap", () => {
  const fixtures = [3, 5, 1, 7, 9];
  const sortedFixtures = [1, 3, 5, 7, 9];
  const fixturesSnapshotsInAddOrder = [[3], [3, 5], [1, 5, 3], [1, 5, 3, 7], [1, 5, 3, 7, 9]];

  let heap;

  beforeEach(() => {
    heap = new Heap({
      pairIsInCorrectOrder(item1, item2) {
        return item1 < item2;
      },
    });
  });

  test("add", () => {
    fixtures.forEach((item, i) => {
      heap.add(item);
      expect(heap.toString()).toEqual(fixturesSnapshotsInAddOrder[i].toString());
    });
  });

  test("toString", () => {
    for (const item of fixtures) {
      heap.add(item);
    }

    expect(heap.toString()).toEqual(fixturesSnapshotsInAddOrder.at(-1).toString());
  });

  test("size", () => {
    fixtures.forEach((item, i) => {
      heap.add(item);
      expect(heap.size()).toEqual(i + 1);
    });

    fixtures.forEach((item, i) => {
      heap.poll();
      expect(heap.size()).toEqual(fixtures.length - (i + 1));
    });
  });

  test("peek", () => {
    fixtures.forEach((item, i) => {
      heap.add(item);
      expect(heap.peek()).toEqual(fixturesSnapshotsInAddOrder[i][0]);
    });

    fixtures.forEach((item, i) => {
      heap.poll();
      expect(heap.peek()).toEqual(sortedFixtures[i + 1]);
    });
  });

  test("poll", () => {
    for (const item of fixtures) {
      heap.add(item);
    }

    fixtures.forEach((item, i) => {
      expect(heap.poll()).toEqual(sortedFixtures[i]);
    });
  });
});

describe("MaxHeap", () => {
  const fixtures = [3, 5, 1, 7, 9];
  const sortedFixtures = [9, 7, 5, 3, 1];
  const fixturesSnapshotsInAddOrder = [[3], [5, 3], [5, 3, 1], [7, 5, 1, 3], [9, 7, 1, 3, 5]];

  let heap;

  beforeEach(() => {
    heap = new Heap({
      pairIsInCorrectOrder(item1, item2) {
        return item1 > item2;
      },
    });
  });

  test("add", () => {
    fixtures.forEach((item, i) => {
      heap.add(item);
      expect(heap.toString()).toEqual(fixturesSnapshotsInAddOrder[i].toString());
    });
  });

  test("toString", () => {
    for (const item of fixtures) {
      heap.add(item);
    }

    expect(heap.toString()).toEqual(fixturesSnapshotsInAddOrder.at(-1).toString());
  });

  test("size", () => {
    fixtures.forEach((item, i) => {
      heap.add(item);
      expect(heap.size()).toEqual(i + 1);
    });

    fixtures.forEach((item, i) => {
      heap.poll();
      expect(heap.size()).toEqual(fixtures.length - (i + 1));
    });
  });

  test("peek", () => {
    fixtures.forEach((item, i) => {
      heap.add(item);
      expect(heap.peek()).toEqual(fixturesSnapshotsInAddOrder[i][0]);
    });

    fixtures.forEach((item, i) => {
      heap.poll();
      expect(heap.peek()).toEqual(sortedFixtures[i + 1]);
    });
  });

  test("poll", () => {
    for (const item of fixtures) {
      heap.add(item);
    }

    fixtures.forEach((item, i) => {
      expect(heap.poll()).toEqual(sortedFixtures[i]);
    });
  });
});
