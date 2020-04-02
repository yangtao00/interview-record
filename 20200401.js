// 寻找出一个数组中第 N 大的值



//

const nMax = (arr, n) => {
  // 筛选出来重复的
  arr = [...new Set(arr)];
  const len = arr.length;
  if (len <= n) return Math.max(...arr);
  for (let i = 0; i < len - 1; i++) {
    let done = true; // 如果数据本身就是有序的 就直接退出
    // j < len - i 每次排序完成后 第一位都是最大的 下次不用再比较
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        done = false;
      }
    }
    if (done) return arr[n - 1];
  }
  return arr[n - 1];
}
console.log(nMax([1,2,2,4,5], 3));
console.log(nMax([1,8,2,4,5], 3));
console.log(nMax([1,10,2,4,5], 3));
console.log(nMax([1,10], 3));
console.log(nMax([1,10], 3));
console.log(nMax([1,10,5], 3));
console.log(nMax([2,1], 3));
console.log(nMax([1,-2344,5], 3));
