import { Trie } from "./trie";

// https://excalidraw.com/#json=4yf3cbK27ROwhViyEPntk,ewlSyQS-_C96UxG6JLvYBw
const fixtures = ["algo", "algorithm", "alcohol", "all", "separate"];

test("words are added and removed", () => {
  const trie = new Trie();

  expect(trie.hasWord(fixtures[0])).toEqual(false);

  for (const fixture of fixtures) {
    trie.addWord(fixture);
  }

  for (const fixture of fixtures) {
    expect(trie.hasWord(fixture)).toEqual(true);
  }

  fixtures.forEach((fixture, i) => {
    trie.removeWord(fixture);
    expect(trie.hasWord(fixture)).toEqual(false);

    fixtures.slice(i + 1).forEach((f) => {
      expect(trie.hasWord(f)).toEqual(true);
    });
  });
});

test("suggests next characters", () => {
  const trie = new Trie();

  expect(trie.suggestNextCharacters("all")).toEqual([]);

  for (const fixture of fixtures) {
    trie.addWord(fixture);
  }

  expect(trie.suggestNextCharacters("al")).toEqual(["g", "c", "l"]);
  expect(trie.suggestNextCharacters("alg")).toEqual(["o"]);
  expect(trie.suggestNextCharacters("algo")).toEqual(["r"]);
  expect(trie.suggestNextCharacters("all")).toEqual([]);
});
