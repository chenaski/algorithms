export function countSort(list, position) {
  let counts = [];

  const getItem = (item) => {
    const itemStr = item.toString();
    return position ? itemStr[position] : item;
  };

  for (let item of list) {
    item = getItem(item);
    counts[item] = (counts[item] || 0) + 1;
  }

  for (let i = 1; i <= counts.length - 1; i++) {
    counts[i] = (counts[i] || 0) + (counts[i - 1] || 0);
  }

  let sortedList = [];

  for (let i = list.length - 1; i >= 0; i--) {
    const item = getItem(list[i]);

    sortedList[counts[item] - 1] = list[i];
    counts[item]--;
  }

  return sortedList;
}
