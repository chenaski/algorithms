import { countSort } from "./count-sort.js";

export function radixSort(list) {
  const max = list.reduce((max, item) => (item > max ? item : max), 0);

  list = list.map((item) => {
    const stringNum = item.toString();
    const diff = max.toString().length - stringNum.length;
    return stringNum.padStart(diff, "0");
  });

  for (let i = max.toString().length; i > 0; i--) {
    countSort(list, i);
  }

  return list;
}
