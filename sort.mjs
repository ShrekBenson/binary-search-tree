function merge(arr, left, right) {
  const leftSize = left.length;
  const rightSize = right.length;

  let i =0, j = 0, k = 0;
  while (i < leftSize && j < rightSize) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i ++;
    } else {
      arr[k] = right[j];
      j ++;
    }
    k ++;
  }
  while (i < leftSize) {
    arr[k] = left[i];
    i ++;
    k ++;
  }
  while (j < rightSize) {
    arr[k] = right[j];
    j ++;
    k ++;
  }
}

function sort(arr) {  
  if (arr.length < 2) return;

  let mid = arr.length / 2;
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i ++) {
    if (i < mid) left.push(arr[i]);
    else right.push(arr[i]);
  }

  sort(left);
  sort(right);
  merge(arr, left, right);
}

export default function fixArray(arr) {
  sort(arr);
  return [...new Set(arr)];
}