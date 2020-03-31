// 1.给定一个整数数组 array 和一个目标值 target，找出该数组中任意 2 项之和等于 target,并返回他们的下标

const sum = (array, target) => {
  const targetMap = {};
  const res = [];
  for (let i = 0, len = array.length; i < len; i++) {
    let key = target - array[i];
    if (targetMap[key] || targetMap[key] === 0) {
      res.push([targetMap[key], i]);
    }
    targetMap[array[i]] = i;
  }
  return res;
};

sum([1, 2, 3, 4, 5, 6], 7);

/* 2.给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例：
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807
*/

// 链表定义

function ListNode(val) {
  this.val = val;
  this.next = null;
}

const add = (l1, l2) => {
  let sum = 0; // 每次相加的和
  let origin = new ListNode(0);
  let curr = origin;

  while (l1 || l2 || sum) {
    sum = (l1 && l1.val) + (l2 && l2.val) + sum;
    curr = curr.next = new ListNode(sum % 10); // 链表后移，如果 2 个值相加大于 10，则大于的数累加到下一位
    l1 = l1 && l1.next;
    l2 = l2 && l2.next;
    sum = Math.floor(sum / 10);
  }
  return origin;
};

console.log('add:', add(new ListNode(2), new ListNode(6)));
