// 冒泡排序
// 算法思路
// 依次比较相邻的元素,交换位置
function bubbleSort(arr) {
  const len = arr.length - 1;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr;
};
console.log(bubbleSort([1,3,5,2,7,89,1]));
// 选择排序
// 算法思路
// 在未排序的系列中找到每次循环的最小值，放到数组的头部
function selectionSort(arr) {
  const len = arr.length - 1;
  let min;
  for (let i = 0; i < len; i++) {
    min = i;
    for (let j = i + 1; j < len + 1; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}
console.log(selectionSort([1,3,5,2,7,89,1]));
// 快速排序
// 算法思路
// 每次找出一个基准值，对序列循环，将小于基准值的放到基准值得左边（left），等于的放到中间（）（center），大于的放到右边（right）
function quickSort(arr) {
  const len = arr.length;
  if (len < 2) return arr;
  let left = [];
  let center = [];
  let right = [];
  let pivot = arr[0];
  for (let i = 0; i < len; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else if (arr[i] === pivot) {
      center.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quickSort(left), ...center, ...quickSort(right)]
}
console.log(quickSort([1,3,5,2,7,89,1]));

// 插入排序
// 算法思路
// 在未排序的序列中，选取一个元素，在有序的序列中依次从后往前对比，直到找到合适的位置
function insertSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let prevIndex = i - 1;
    let currValue = arr[i];
    while (prevIndex >= 0 && arr[prevIndex] > currValue) {
      arr[prevIndex + 1] = arr[prevIndex];
      prevIndex--
    }
    arr[prevIndex + 1] = currValue;
  }
  return arr;
}
console.log(insertSort([1,3,5,2,7,89,1]));

// 有 n 个台阶，每次可以走 1 阶或者 2 阶，问题多少种走法
// 递归 1
function stairTotal(n) {
  if (n <= 1) {
    return 1;
  } else {
    return stairTotal(n - 1) + stairTotal(n - 2);
  }
}
// 尾递归
function stairTotal2(n, start = 1, total = 1) {
  if (n <= 1) {
    return total
  } else {
    return stairTotal2(n - 1, total, total + start)
  }
}