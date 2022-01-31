export function binarySearch(list, target) {
  let low = 0;
  let high = list.length - 1;
  let steps = 0;

  while (low <= high) {
    steps++;

    let cursor = Math.floor((low + high) / 2);
    const cursorValue = list[cursor];

    if (cursorValue === target) return [cursor, steps];
    else if (cursorValue > target) high = cursor - 1;
    else low = cursor + 1;
  }

  return [-1, steps];
}
