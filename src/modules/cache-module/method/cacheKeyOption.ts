const getRandom = (num = -8) => {
  return Math.random().toString(36).slice(num); //随机生成一个36进制的字符串并截取后八位
};
const getRandomInteger = (min = 10, max = 99) => {
  return Math.floor(Math.random() * (max - min + 1) + min); //10~99中的一个整数
};
const getRandomStr = (len: number) => {
  try {
    const num = Math.ceil(len / 8);
    let str = '';
    for (let index = 0; index < num; index++) {
      str += getRandom();
    }
    return str.slice(0, len);
  } catch (e) {
    return '';
  }
};
/**
 * 缓存密钥
 */
export const cacheKeyOption = () => getRandomStr(getRandomInteger());
