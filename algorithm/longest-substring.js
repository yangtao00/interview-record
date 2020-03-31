// 找出最长的无重复字符串的长度
// 如
// abcabcbb ->  abc 3
// bbbb -> b 1
// pwwkew -> wke 3

var longestStr = (str) => {

  let res = 0;
  let temp = [];
  let i = 0;

  while (i < str.length) {
    if (temp.indexOf(str[i]) === -1) {
      temp.push(str[i]);
    } else {
      temp.shift();
      continue;
    }
    res = Math.max(res, temp.length);
    i++;
  }
  return res;
}

console.log(longestStr('abcabcbb'));
console.log(longestStr('bbbb'));
console.log(longestStr('pwwkew'));
console.log(longestStr(' ba b'));