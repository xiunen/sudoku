//随机打乱数字
const randomSort = arr => {
  return arr.sort(() => {
    return 0.5 - Math.random();
  });
};

//随机获取一个位置
const getRandomValue = values => {
  const value = values[Math.floor(values.length * Math.random())];
  return value;
};

const getIntersection = (arr1 = [], arr2 = [], arr3 = []) => {
  return arr1.filter(item => arr2.includes(item) && arr3.includes(item));
};

module.exports = {
  randomSort,
  getRandomValue,
  getIntersection
};
