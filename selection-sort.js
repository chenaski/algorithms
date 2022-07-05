export function findSmallest(list) {
  return list.reduce((smallestIndex, item, index) => {
    if (item < list[smallestIndex]) return index;
    return smallestIndex;
  }, 0);
}

export function selectionSort(list, getItemIndex) {
  let currentIndex = 0;

  while (currentIndex <= list.length - 1) {
    const unsortedList = [...list].splice(currentIndex);
    const foundIndexInUnsortedList = getItemIndex(unsortedList);
    const foundIndex = foundIndexInUnsortedList + currentIndex;

    [list[currentIndex], list[foundIndex]] = [list[foundIndex], list[currentIndex]];

    currentIndex++;
  }

  return list;
}

export function recursiveSelectionSort(list, getItemIndex) {
  if (list.length < 2) return list;
  const foundIndex = getItemIndex(list);
  return [list[foundIndex], ...recursiveSelectionSort((list.splice(foundIndex, 1), list), getItemIndex)];
}
