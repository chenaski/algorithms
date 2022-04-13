import { HashTable } from "./hash-table";

const fixtures = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
  ["ab", 4],
  ["ba", 5],
];

test("put", () => {
  const hashTable = new HashTable();

  for (const [key, data] of fixtures) {
    hashTable.put(key, data);
    expect(hashTable.get(key)).toEqual(data);
  }
});

test("get", () => {
  const hashTable = new HashTable();

  for (const [key, data] of fixtures) {
    expect(hashTable.get(key)).toEqual(undefined);
    hashTable.put(key, data);
  }

  for (const [key, data] of fixtures) {
    expect(hashTable.get(key)).toEqual(data);
  }
});

test("remove", () => {
  const hashTable = new HashTable();

  for (const [key, data] of fixtures) {
    hashTable.put(key, data);
  }

  for (const [key] of fixtures) {
    hashTable.remove(key);
    expect(hashTable.get(key)).toEqual(undefined);
  }
});

test("getKeys", () => {
  const hashTable = new HashTable();

  for (const [key, data] of fixtures) {
    hashTable.put(key, data);
  }

  expect(hashTable.getKeys()).toEqual(Object.keys(Object.fromEntries(fixtures)));
});

test("getValues", () => {
  const hashTable = new HashTable();

  for (const [key, data] of fixtures) {
    hashTable.put(key, data);
  }

  expect(hashTable.getValues()).toEqual(Object.values(Object.fromEntries(fixtures)));
});
