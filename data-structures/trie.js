export class TrieNode {
  children = [];
  isComplete = false;

  constructor(char) {
    this.char = char;
  }

  addChild(char) {
    const existedNode = this.getChild(char);

    if (existedNode) return existedNode;

    const newNode = new TrieNode(char);
    this.children.push(newNode);
    return newNode;
  }

  removeChild(char) {
    this.children = this.children.filter((node) => node.char !== char);
  }

  hasChild(char) {
    return !!this.children.find((node) => node.char === char);
  }

  getChild(char) {
    return this.children.find((node) => node.char === char);
  }

  hasChildren() {
    return this.children.length;
  }

  setComplete(isComplete) {
    this.isComplete = isComplete;
  }
}

export class Trie {
  #head = new TrieNode("");

  addWord(word) {
    if (this.hasWord(word)) return;

    let currentNode = this.#head;

    Array.from(word).forEach((char) => {
      currentNode = currentNode.addChild(char);
    });

    currentNode.setComplete(true);
  }

  removeWord(word) {
    if (!this.hasWord(word)) return false;

    let nodeToRemove;
    let nodeToRemoveParent;
    let prevNode;
    let currentNode = this.#head;

    Array.from(word).forEach((char) => {
      prevNode = currentNode;
      currentNode = currentNode.getChild(char);

      if (currentNode.children.length > 1) {
        nodeToRemove = null;
        nodeToRemoveParent = null;
      } else if (!nodeToRemove) {
        nodeToRemove = currentNode;
        nodeToRemoveParent = prevNode;
      }
    });

    if (!nodeToRemoveParent || !nodeToRemove) {
      return false;
    } else if (currentNode.hasChildren()) {
      currentNode.setComplete(false);
      return true;
    } else {
      nodeToRemoveParent.removeChild(nodeToRemove.char);
      return true;
    }
  }

  hasWord(word) {
    let currentNode = this.#head;

    for (const char of Array.from(word)) {
      if (!currentNode.hasChild(char)) return false;
      currentNode = currentNode.getChild(char);
    }

    return currentNode.isComplete;
  }

  suggestNextCharacters(word) {
    const lastCharNode = this.getLastCharacterNode(word);

    if (!lastCharNode?.hasChildren()) return [];

    return lastCharNode.children.map(({ char }) => char);
  }

  getLastCharacterNode(word) {
    let lastCharNode = this.#head;

    for (const char of Array.from(word)) {
      lastCharNode = lastCharNode.getChild(char);
      if (!lastCharNode) break;
    }

    return lastCharNode;
  }
}
