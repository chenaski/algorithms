export function bubbleSort(arr) {
  let isSorted = false;
  let lastUnsorted = arr.length - 1;

  while (!isSorted) {
    isSorted = true;

    for (let i = 0; i < lastUnsorted; i++) {
      const a = arr[i];
      const b = arr[i + 1];

      if (a > b) {
        arr[i] = b;
        arr[i + 1] = a;

        isSorted = false;
      }
    }

    lastUnsorted--;
  }

  return arr;
}
