export function binarySearch(list, target) {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    let cursor = Math.floor((low + high) / 2);
    const cursorValue = list[cursor];

    if (cursorValue === target) return cursor;
    else if (cursorValue > target) high = cursor - 1;
    else low = cursor + 1;
  }

  return -1;
}

const list = [1, 3, 5, 7, 9];
console.log(binarySearch(list, 3));
