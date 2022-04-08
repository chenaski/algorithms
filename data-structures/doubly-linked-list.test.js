import { DoublyLinkedList } from "./doubly-linked-list.js";

describe("DoublyLinkedList", () => {
  test("append", () => {
    const doublyLinkedList = new DoublyLinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");

    doublyLinkedList.append(expectedValue1);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(true);
    expect(doublyLinkedList.head).toBe(expectedValue1);
    expect(doublyLinkedList.tail).toBe(expectedValue1);

    doublyLinkedList.append(expectedValue2);

    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.head).toBe(expectedValue1);
    expect(doublyLinkedList.tail).toBe(expectedValue2);

    doublyLinkedList.append(expectedValue3);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue3)).toBe(true);
    expect(doublyLinkedList.head).toBe(expectedValue1);
    expect(doublyLinkedList.tail).toBe(expectedValue3);
  });

  test("prepend", () => {
    const doublyLinkedList = new DoublyLinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");

    doublyLinkedList.prepend(expectedValue1);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(true);
    expect(doublyLinkedList.head).toBe(expectedValue1);
    expect(doublyLinkedList.tail).toBe(expectedValue1);

    doublyLinkedList.prepend(expectedValue2);

    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.head).toBe(expectedValue2);
    expect(doublyLinkedList.tail).toBe(expectedValue1);

    doublyLinkedList.prepend(expectedValue3);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue3)).toBe(true);
    expect(doublyLinkedList.head).toBe(expectedValue3);
    expect(doublyLinkedList.tail).toBe(expectedValue1);
  });

  test("remove", () => {
    const doublyLinkedList = new DoublyLinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");
    const expectedValue4 = Symbol("4");
    const expectedValue5 = Symbol("5");

    doublyLinkedList.append(expectedValue1);
    doublyLinkedList.append(expectedValue2);
    doublyLinkedList.append(expectedValue3);
    doublyLinkedList.append(expectedValue4);
    doublyLinkedList.append(expectedValue5);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue3)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue4)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue5)).toBe(true);

    expect(doublyLinkedList.head).toBe(expectedValue1);
    expect(doublyLinkedList.tail).toBe(expectedValue5);

    doublyLinkedList.remove(expectedValue1);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(false);
    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue3)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue4)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue5)).toBe(true);

    expect(doublyLinkedList.head).toBe(expectedValue2);
    expect(doublyLinkedList.tail).toBe(expectedValue5);

    doublyLinkedList.remove(expectedValue5);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(false);
    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue3)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue4)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue5)).toBe(false);

    expect(doublyLinkedList.head).toBe(expectedValue2);
    expect(doublyLinkedList.tail).toBe(expectedValue4);

    doublyLinkedList.remove(expectedValue3);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(false);
    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue3)).toBe(false);
    expect(doublyLinkedList.contains(expectedValue4)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue5)).toBe(false);

    expect(doublyLinkedList.head).toBe(expectedValue2);
    expect(doublyLinkedList.tail).toBe(expectedValue4);
  });

  test("traverse", () => {
    const doublyLinkedList = new DoublyLinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");
    const expectedValue4 = Symbol("4");
    const expectedValue5 = Symbol("5");
    const expectedOrder = [expectedValue1, expectedValue2, expectedValue3, expectedValue4, expectedValue5];

    doublyLinkedList.append(expectedValue1);
    doublyLinkedList.append(expectedValue2);
    doublyLinkedList.append(expectedValue3);
    doublyLinkedList.append(expectedValue4);
    doublyLinkedList.append(expectedValue5);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue3)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue4)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue5)).toBe(true);

    expect(doublyLinkedList.head).toBe(expectedValue1);
    expect(doublyLinkedList.tail).toBe(expectedValue5);

    doublyLinkedList.traverse((node, i) => {
      console.log(node);
      expect(node.value).toBe(expectedOrder[i]);
    });
  });

  test("reverseTraversal", () => {
    const doublyLinkedList = new DoublyLinkedList();

    const expectedValue1 = Symbol("1");
    const expectedValue2 = Symbol("2");
    const expectedValue3 = Symbol("3");
    const expectedValue4 = Symbol("4");
    const expectedValue5 = Symbol("5");
    const expectedOrder = [expectedValue5, expectedValue4, expectedValue3, expectedValue2, expectedValue1];

    doublyLinkedList.append(expectedValue1);
    doublyLinkedList.append(expectedValue2);
    doublyLinkedList.append(expectedValue3);
    doublyLinkedList.append(expectedValue4);
    doublyLinkedList.append(expectedValue5);

    expect(doublyLinkedList.contains(expectedValue1)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue2)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue3)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue4)).toBe(true);
    expect(doublyLinkedList.contains(expectedValue5)).toBe(true);

    expect(doublyLinkedList.head).toBe(expectedValue1);
    expect(doublyLinkedList.tail).toBe(expectedValue5);

    doublyLinkedList.reverseTraversal((node, i) => {
      expect(node.value).toBe(expectedOrder[i]);
    });
  });
});
