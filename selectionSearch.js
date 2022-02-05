export function findSmallest(list) {
  return list.reduce((smallestIndex, item, index) => {
    if (item < list[smallestIndex]) return index;
    return smallestIndex;
  }, 0);
}

export function selectionSearch(list, getItemIndex) {
  return list.reduce(
    ([sortedList, targetList], item, index) => {
      const foundIndex = getItemIndex(targetList);
      sortedList.push(targetList[foundIndex]);
      targetList.splice(foundIndex, 1);
      return [sortedList, targetList];
    },
    [[], [...list]]
  )[0];
}

console.log(selectionSearch([5, 4, 3, 2, 1], findSmallest));
