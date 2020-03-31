// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
// 注意：假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 [−2**32,  2**31 − 1]。请根据这个假设，如果反转后整数溢出那么就返回 0。

var reverse = function(x) {

  let symbol = x < 0 ? '-' : '';
  // 翻转并合并
  x = String(x).split('').reverse().join('');
  // 去除首尾的 0 和末尾的 -
  x = +(symbol + x.replace(/^(0)+|(0|-)+$/g, ''));
  if (x > 2**31 - 1 || x < -(2**31)) {
    // console.log('x:', 0);
    return 0;
  }
  // console.log('x:', x);
  return x;
};
reverse(1563847412);