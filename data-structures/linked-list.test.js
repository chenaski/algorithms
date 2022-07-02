import { LinkedList } from "./linked-list.js";

describe("LinkedList", () => {
  test("push", () => {
    const linkedList = new LinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");

    linkedList.push(expectedValue1);

    expect(linkedList.contains(expectedValue1)).toBe(true);
    expect(linkedList.pop()).toBe(expectedValue1);
    expect(linkedList.shift()).toBe(expectedValue1);

    linkedList.push(expectedValue2);

    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.pop()).toBe(expectedValue2);
    expect(linkedList.shift()).toBe(expectedValue1);

    linkedList.push(expectedValue3);

    expect(linkedList.contains(expectedValue1)).toBe(true);
    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.contains(expectedValue3)).toBe(true);
    expect(linkedList.pop()).toBe(expectedValue3);
    expect(linkedList.shift()).toBe(expectedValue1);
  });

  test("unshift", () => {
    const linkedList = new LinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");

    linkedList.unshift(expectedValue1);

    expect(linkedList.contains(expectedValue1)).toBe(true);
    expect(linkedList.pop()).toBe(expectedValue1);
    expect(linkedList.shift()).toBe(expectedValue1);

    linkedList.unshift(expectedValue2);

    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.pop()).toBe(expectedValue1);
    expect(linkedList.shift()).toBe(expectedValue2);

    linkedList.unshift(expectedValue3);

    expect(linkedList.contains(expectedValue1)).toBe(true);
    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.contains(expectedValue3)).toBe(true);
    expect(linkedList.pop()).toBe(expectedValue1);
    expect(linkedList.shift()).toBe(expectedValue3);
  });

  test("remove", () => {
    const linkedList = new LinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");
    const expectedValue4 = Symbol("4");
    const expectedValue5 = Symbol("5");

    linkedList.push(expectedValue1);
    linkedList.push(expectedValue2);
    linkedList.push(expectedValue3);
    linkedList.push(expectedValue4);
    linkedList.push(expectedValue5);

    expect(linkedList.contains(expectedValue1)).toBe(true);
    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.contains(expectedValue3)).toBe(true);
    expect(linkedList.contains(expectedValue4)).toBe(true);
    expect(linkedList.contains(expectedValue5)).toBe(true);

    expect(linkedList.pop()).toBe(expectedValue5);
    expect(linkedList.shift()).toBe(expectedValue1);

    linkedList.remove(expectedValue1);

    expect(linkedList.contains(expectedValue1)).toBe(false);
    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.contains(expectedValue3)).toBe(true);
    expect(linkedList.contains(expectedValue4)).toBe(true);
    expect(linkedList.contains(expectedValue5)).toBe(true);

    expect(linkedList.pop()).toBe(expectedValue5);
    expect(linkedList.shift()).toBe(expectedValue2);

    linkedList.remove(expectedValue5);

    expect(linkedList.contains(expectedValue1)).toBe(false);
    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.contains(expectedValue3)).toBe(true);
    expect(linkedList.contains(expectedValue4)).toBe(true);
    expect(linkedList.contains(expectedValue5)).toBe(false);

    expect(linkedList.pop()).toBe(expectedValue4);
    expect(linkedList.shift()).toBe(expectedValue2);

    linkedList.remove(expectedValue3);

    expect(linkedList.contains(expectedValue1)).toBe(false);
    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.contains(expectedValue3)).toBe(false);
    expect(linkedList.contains(expectedValue4)).toBe(true);
    expect(linkedList.contains(expectedValue5)).toBe(false);

    expect(linkedList.pop()).toBe(expectedValue4);
    expect(linkedList.shift()).toBe(expectedValue2);
  });

  test("reverse", () => {
    const linkedList = new LinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");
    const expectedValue4 = Symbol("4");
    const expectedValue5 = Symbol("5");

    linkedList.push(expectedValue1);
    linkedList.push(expectedValue2);
    linkedList.push(expectedValue3);
    linkedList.push(expectedValue4);
    linkedList.push(expectedValue5);

    expect(linkedList.contains(expectedValue1)).toBe(true);
    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.contains(expectedValue3)).toBe(true);
    expect(linkedList.contains(expectedValue4)).toBe(true);
    expect(linkedList.contains(expectedValue5)).toBe(true);

    expect(linkedList.pop()).toBe(expectedValue5);
    expect(linkedList.shift()).toBe(expectedValue1);

    linkedList.reverse();

    expect(linkedList.contains(expectedValue1)).toBe(true);
    expect(linkedList.contains(expectedValue2)).toBe(true);
    expect(linkedList.contains(expectedValue3)).toBe(true);
    expect(linkedList.contains(expectedValue4)).toBe(true);
    expect(linkedList.contains(expectedValue5)).toBe(true);

    expect(linkedList.pop()).toBe(expectedValue1);
    expect(linkedList.shift()).toBe(expectedValue5);
  });

  test("size", () => {
    const linkedList = new LinkedList();

    const values = [Symbol("1"), Symbol("2"), Symbol("3"), Symbol("4"), Symbol("5")];

    for (const value of values) {
      linkedList.push(value);
    }

    expect(linkedList.size()).toEqual(values.length);
  });

  test("toArray", () => {
    const linkedList = new LinkedList();

    const values = [Symbol("1"), Symbol("2"), Symbol("3"), Symbol("4"), Symbol("5")];

    for (const value of values) {
      linkedList.push(value);
    }

    expect(linkedList.toArray()).toEqual(values);
  });
});
