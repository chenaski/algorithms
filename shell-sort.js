export function shellSort(list) {
  let gap = Math.floor(list.length / 2);

  const swap = (index1, index2) => {
    [list[index1], list[index2]] = [list[index2], list[index1]];
  };

  const goForward = (list, gap) => {
    let leftIndex = 0;
    let rightIndex = leftIndex + gap;

    while (rightIndex < list.length) {
      if (list[leftIndex] > list[rightIndex]) {
        swap(leftIndex, rightIndex);
        goBackward(list, gap, leftIndex);
      }

      leftIndex++;
      rightIndex = leftIndex + gap;
    }
  };

  const goBackward = (list, gap, index) => {
    let leftIndex = index - gap;
    let rightIndex = index;

    while (leftIndex >= 0) {
      if (list[leftIndex] > list[rightIndex]) {
        swap(leftIndex, rightIndex);
      }

      leftIndex--;
      rightIndex = leftIndex + gap;
    }
  };

  while (gap > 0) {
    goForward(list, gap);
    gap = Math.floor(gap / 2);
  }

  return list;
}
