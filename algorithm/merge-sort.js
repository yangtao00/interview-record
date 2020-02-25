// 给定 2 个有序数组 nums1 和 nums2，将 nums合并到 num1 中，并且 nums1 变成一个有序数组

// 例如
// 输入
//     nums1 = [1,2,3] m = 3
//     nums2 = [2,5,6] n = 3
// 输出  nums1 = [1,2,2,3,5,6]

const merge1 = (arr1, m, arr2, n) => {
  arr1 = arr1.concat(arr2);
  for (let i = 0, len = arr1.length; i < len; i++) {
    arr1.sort((a, b) => {
      return a - b;
    });
  }
  return arr1;
};
const nums1 = [1, 2, 3];
const m = 3;
const nums2 = [2, 2, 6];
const n = 3;
console.log('merge1:', merge1(nums1, m, nums2, n));


const merge2 = (arr1, m, arr2, n) => {
  let p = m-- + n-- - 1; // arr1和 arr2合并之后 最后一个下标
  while (m >= 0 && n >= 0) {
    // 对比有序数组中的最大值，结果为所有数组中的最大值，放入 arr1 的最后
    arr1[p--] = arr1[m] > arr2[n] ? arr1[m--] : nums2[n--];
  }
  // n > 0 即比原有的 arr1 中的所有元素都要小，直接放到，直接放入 arr1,
  while (n >= 0) {
    arr1[p--] = arr2[n--]
  }
  return arr1
}

console.log('merge2:', merge2(nums1, m, nums2, n));