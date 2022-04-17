import { LinkedList } from "./linked-list";

export class HashTable {
  #buckets = {};

  createHashFromKey(key) {
    return Array.from(key).reduce((hash, symbol) => hash + symbol.charCodeAt(0), 0);
  }

  put(key, value) {
    const hash = this.createHashFromKey(key);

    if (!this.#buckets[hash]) {
      this.#buckets[hash] = { key, data: value };
    } else if (this.#buckets[hash] instanceof LinkedList) {
      this.#buckets[hash] = { key, data: value };
    } else {
      const existedValue = this.#buckets[hash];
      this.#buckets[hash] = new LinkedList();
      this.#buckets[hash].push(existedValue);
      this.#buckets[hash].push({ key, data: value });
    }
  }

  get(key) {
    const hash = this.createHashFromKey(key);
    const bucket = this.#buckets[hash];

    if (bucket instanceof LinkedList) {
      let foundNode;
      bucket.forEach(({ currentNode }) => {
        if (currentNode.value.key === key) {
          foundNode = currentNode;
          return true;
        }
      });

      return foundNode?.value.data;
    } else if (bucket) {
      return bucket.key === key ? bucket.data : undefined;
    }
  }

  remove(key) {
    const hash = this.createHashFromKey(key);
    const bucket = this.#buckets[hash];

    if (bucket instanceof LinkedList) {
      let foundNode;
      bucket.forEach(({ currentNode }) => {
        if (currentNode.value.key === key) {
          foundNode = currentNode.value;
          return true;
        }
        return foundNode?.value;
      });

      if (foundNode) {
        bucket.remove(foundNode);
      }
    } else {
      delete this.#buckets[hash];
    }
  }

  has(key) {
    return !!this.get(key);
  }

  getKeys() {
    const hashes = Object.keys(this.#buckets);
    return hashes.reduce((keys, hash) => {
      const bucket = this.#buckets[hash];

      if (bucket instanceof LinkedList) {
        bucket.forEach(({ currentNode }) => {
          keys.push(currentNode.value.key);
        });
      } else {
        keys.push(bucket.key);
      }

      return keys;
    }, []);
  }

  getValues() {
    const hashes = Object.keys(this.#buckets);
    return hashes.reduce((values, hash) => {
      const bucket = this.#buckets[hash];

      if (bucket instanceof LinkedList) {
        bucket.forEach(({ currentNode }) => {
          values.push(currentNode.value.data);
        });
      } else {
        values.push(bucket.data);
      }

      return values;
    }, []);
  }
}
