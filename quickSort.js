export function quickSort(list) {
  if (list.length < 2) return list;
  const [pivot, ...rest] = list;
  const less = [];
  const greater = [];
  for (const item of rest) {
    if (item < pivot) less.push(item);
    else greater.push(item);
  }
  return [...quickSort(less), pivot, ...quickSort(greater)];
}
