export function countSort(list) {
  let counts = [];

  for (const item of list) {
    counts[item] = (counts[item] || 0) + 1;
  }

  for (let i = 1; i <= counts.length - 1; i++) {
    counts[i] = (counts[i] || 0) + (counts[i - 1] || 0);
  }

  let sortedList = [];

  for (let i = list.length - 1; i >= 0; i--) {
    sortedList[counts[list[i]] - 1] = list[i];
    counts[list[i]]--;
  }

  return sortedList;
}
