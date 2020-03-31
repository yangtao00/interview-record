function _new(Con, ...args) {
  const obj = {}; // 首先创建一个对象
  Object.setPrototypeOf(obj, Con.prototype); // 链接到原型，调用原型链上方法
  const result = Con.apply(obj, args); // 绑定 this
  // 处理返回值，这里需要区分返回值是对象还原始类型， 是原始类型忽略 是对象就使用对象
  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }
  return obj;
}

const f = function(name, age) {
  this.name = name;
  this.age = age;
};
f.prototype.say = function() {
  console.log(this.name, this.age);
};
const obj = _new(f, 'xxx', '26');
obj.say();

function sortArray(arr1, arr2) {
  let i = 0,
    j = 0,
    k = 0;
  let list = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      list[k] = arr1[i];
      i++;
    } else if (arr1[i] > arr2[j]) {
      list[k] = arr2[j];
      j++;
    } else if (arr1[i] === arr2[j]) {
      list[k] = arr1[i];
      k++;
      list[k] = arr2[j];
      i++;
      j++;
    }
    k++;
  }
  while (i < arr1.length) {
    list[k] = arr1[i];
    i++;
    k++;
  }
  while (j < arr2.length) {
    list[k] = arr1[j];
    j++;
    k++;
  }
  return list;
}

let result = sortArray([2, 5, 11], [4, 7, 9, 10]);
console.log('result:', result);

var merge = function(nums1, m, nums2, n) {
  nums1.splice(m, nums1.length - m);
  nums2.splice(n, nums2.length - n);
  return Object.assign(
    nums1,
    [...nums1, ...nums2].sort((a, b) => a - b),
  );
};

console.log('result-2:', merge([2, 5, 11], 3, [4, 7, 9, 10], 4));

const merge1 = (nums1, m, nums2, n) => {
  nums1 = nums1.slice(0, m).concat(nums2);
  return nums1.sort((a, b) => a - b);
};
const nums1 = [1, 2, 3, 0, 0, 0];
const m = 3;
const nums2 = [2, 5, 6];
const n = 3;
console.log('merge1:', merge1(nums1, m, nums2, n));

var twoSum = function(nums, target) {
  const obj = {};
  const res = [];
  for (let i = 0, len = nums.length; i < len; i++) {
    const key = target - nums[i];
    if (obj[key] || obj[key] === 0) {
      return [obj[key], i];
    }
    obj[nums[i]] = i;
  }
};

twoSum([2, 7, 9, 11], 9);

function Parent(name, age) {
  this.name = name;
  this.age = age;
}

Parent.prototype.toSay = function() {
  console.log('hello' + this.name);
};

const p = new Parent('张三', 25);

p.toSay();

function Child(name, age) {
  Parent.call(this, name, age);
}

Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;
// Child.prototype = new Parent();

const c = new Child('李四', 26);
c.toSay();
console.log('c:', c);

console.log('-------------------');
var lengthOfLongestSubstring = function(s) {
  if (s.length <= 1) return s.length;

  s = s.split('');
  let result = [];
  // [a, b, c, b]
  for (let i = 0, len = s.length - 1; i < len; i++) {
    let temp = [s[i]];
    for (let j = i + 1, leng = s.length; j < leng; j++) {
      if (temp.indexOf(s[j]) >= 0) {
        if (temp.length > result.length) result = temp;
        break;
      } else {
        temp.push(s[j]);
        // console.log('j:', j, leng);
        if (j === leng - 1) {
          // console.log('jjjj:', temp);
          if (temp.length > result.length) result = temp;
          // return result.length;
          return result.length;
        }
      }
    }
  }
  return result.length;
};

console.log(lengthOfLongestSubstring('abcd'));
console.log(lengthOfLongestSubstring('abcb'));
console.log(lengthOfLongestSubstring(' '));
console.log(lengthOfLongestSubstring('bbbb'));
console.log(lengthOfLongestSubstring('abcabcbb'));
console.log(lengthOfLongestSubstring('pwwkew'));