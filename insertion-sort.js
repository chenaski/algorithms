export function findIndex(list, item) {
  for (let i = list.length - 1; i >= 0; i--) {
    const a = list[i];
    const b = list[i - 1];

    if (i === 0 && item < a) {
      return i;
    } else if (item < a && item > b) {
      return i;
    }
  }

  return -1;
}

export function insertionSort(list) {
  let currentIndex = 1;

  for (let i = currentIndex; i <= list.length - 1; i++) {
    const foundIndex = findIndex(list.slice(0, currentIndex), list[currentIndex]);

    if (foundIndex !== -1) {
      const item = list[currentIndex];
      list.splice(currentIndex, 1);
      list.splice(foundIndex, 0, item);
    }

    currentIndex++;
  }

  return list;
}
