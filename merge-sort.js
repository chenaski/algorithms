export function mergeSortTopDown(list) {
  if (list.length < 2) return list;

  const middle = Math.ceil(list.length / 2);
  const left = list.slice(0, middle);
  const right = list.slice(middle);

  return merge(mergeSortTopDown(left), mergeSortTopDown(right));
}

export function mergeSortBottomUp(list) {
  let groupSize = 2;
  let sortedList = [];
  let iterationsCount = Math.floor(list.length / 2);

  while (iterationsCount > 0) {
    while (list.length) {
      const currentGroup = list.splice(0, groupSize);

      if (currentGroup.length === 1) {
        sortedList = sortedList.concat(currentGroup);
      } else {
        const left = currentGroup.slice(0, Math.floor(groupSize / 2));
        const right = currentGroup.slice(Math.floor(groupSize / 2));
        sortedList = sortedList.concat(merge(left, right));
      }
    }

    groupSize *= 2;
    iterationsCount--;
    list = [...sortedList];
    sortedList = [];
  }

  return list;
}

function merge(left, right) {
  const result = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  while (left.length) {
    result.push(left.shift());
  }

  while (right.length) {
    result.push(right.shift());
  }

  return result;
}
