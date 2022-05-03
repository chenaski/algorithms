export function findSmallest(list) {
  return list.reduce((smallestIndex, item, index) => {
    if (item < list[smallestIndex]) return index;
    return smallestIndex;
  }, 0);
}

export function selectionSearch(list, getItemIndex) {
  return list.reduce(
    ([sortedList, targetList]) => {
      const foundIndex = getItemIndex(targetList);
      sortedList.push(targetList[foundIndex]);
      targetList.splice(foundIndex, 1);
      return [sortedList, targetList];
    },
    [[], [...list]]
  )[0];
}

export function recursiveSelectionSearch(list, getItemIndex) {
  if (list.length < 2) return list;
  const foundIndex = getItemIndex(list);
  return [list[foundIndex], ...recursiveSelectionSearch((list.splice(foundIndex, 1), list), getItemIndex)];
}
