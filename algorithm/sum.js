// 给定一个整数数组 array 和一个目标值 target，找出该数组中任意 2 项之和等于 target,并返回他们的下标


const sum = (array, target) => {
  const targetMap = {};
  const res = []
  for (let i = 0, len = array.length; i < len; i++) {
    let key = target - array[i];
    if (targetMap[key] || targetMap[key] === 0) {
      res.push([targetMap[key], i]);
    }
    targetMap[array[i]] = i;
  }
  return res;
}

sum([1,2,3,4,5,6], 7)