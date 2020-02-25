### 1. 以下代码会打印结果是什么？

```js
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(b.x, a.x);
```

过程分析

```js
var a = { n: 1 };
var b = a;
```

当代码执行到这里，`a`和`b`指向的是同一对象`{n: 1}`,记录为对象`1`,代码继续往下执行

```js
a.x = a = { n: 2 };
```

这里需要注意的一点是`js`中运算符的优先级，其中`.`操作符的优先级大于`=`操作符，因此上述代码先执行`a.x`，此时相当于在`对象1`中添加了一个 `x: undefined`的`key-value`，然后继续执行`a = {n: 2}`，此时已经改变了`a`的指向，`a`指向了一个新对象，记录为`对象2`，其值为`{n: 2}`（但是`b`的指向仍然是`对象1`），然后又将`{n: 2}`赋值给了`a.x`,从而`对象1`的值改成了`{n: 1, x: {n: 2}}`，用代码表示就是

```javascript
a.x = { n: 2 };
a = { n: 1 };
```

因此改代码的打印结果为`{n: 2}, undefined`

### 2. `es6`中的`Map`和`object`有什么区别?

    两者在结构上很类似，都是以`key: value`的形式存储

    不同的地方在于

    1.`object`里面的`key`只能是`string`，而`Map`可以允许任何类型的值作为`key`(`Map`的键实际上是跟内存地址绑定的)

    2.`Map`的对属性的操作方式和`object`不一样

    3.`Map`具有`size`属性，具有`Map.keys()`,`Map.value()`,`Map.entries()`等遍历器生成函数，同时也可以进行`forEach`
    [参考连接](http://es6.ruanyifeng.com/#docs/set-map#Map)

### 3. 请你用代码实现`12345345.23 => 12,345,345.23`

    第一种：
    `Number('12345345.23').toLocaleString()`
    注意这种方法需要字符串为`Number`类型，因为我们这里使用`Number`处理一下需要处理的字符串

    第二种：
    使用正则：
    `'12345345'.replace(/(\d)(?=(\d{3})+$)/g, '$1,')`
    注意使用正则处理不了带小数的数字，例如`12345345.23`

### 4. 手写`new`和`instanceof`

`new`的实现

```js
function _new() {
  const obj = {}; // 创建一个对象
  const fn = [].shift.call(arguments); // 处理传参的问题
  obj.__proto__ = fn.prototype; //链接到原型
  let res = fn.apply(obj, arguments); // 绑定到 this
  console.log('res:', res);
  // 这里需要排除 res == null的情况
  if ((res && typeof res === 'object') || typeof res === 'function') {
    return res;
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
obj.say(); // xxx 26
```

`instanceof`的实现

```js
function _instanceof(obj, con) {
  while (obj) {
    if (obj.__proto__ === con.prototype) {
      return true;
    } else {
      obj = obj.__proto__;
    }
  }
  return false;
}
```

### 5. 实现一个函数，具备一下功能 将数组降维到 1 维，且去除重，并从小到大排列

```js
// forEach 递归
const arr = [1, [2, 3, [4, 5]]];
function flat1(arr = [], result = []) {
  arr.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flat1(item, []));
    } else {
      result.push(item);
    }
  });
  return result;
}
flat1(arr); // [1, 2, 3, 4, 5]

// es6 api Array.flat(n) n - 指定要提取嵌套数组的结构深度，默认值为 1,使用 Infinity 作为深度，展开任意深度的嵌套数组
arr.flat(); // [1, 2, 3, [4, 5]]
arr.flat(1); // [1, 2, 3, [4, 5]]
arr.flat(2); // [1, 2, 3, 4, 5]
arr.flat(Infinity); // [1, 2, 3, 4, 5]

// array.reduce
function flat2(arr) {
  return arr.reduce((acc, curr) => {
    return Array.isArray(curr) ? acc.concat(flat2(curr)) : acc.concat(curr);
  }, []);
}
```

### 6. 手写实现 call、apply、bind

```js
// call
Function.prototype.call = function(context) {
  context = context || window;
  context.fn = this;
  const res = context.fn(...[...arguments].splice(1));
  delete context.fn;
  return res;
};
// apply
Function.prototype.apply = function(context) {
  context = context || window;
  context.fn = this;
  const res = arguments[1] ? context.fn(...arguments[1]) : context.fn();
  delete context.fn;
  return res;
};
// bind
Function.protptype.bind = function(context) {
  if (typeof this !== 'function') {
    throw new Errow(
      'Function.prototype.bind - what is trying to be bound is not callable',
    );
  }
  const self = this;
};
```
