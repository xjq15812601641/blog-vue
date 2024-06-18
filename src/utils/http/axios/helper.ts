import { isObject, isString } from "/@/utils/is/is";

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// 返回随机8位字符串
export const randomStr = (num = -8) => {
  return Math.random().toString(36).slice(num);//随机生成一个36进制的字符串并截取后八位
};

// 返回指定区间整数
export const getRandomInt = (min = 10, max = 99) => {
  return Math.floor(Math.random() * (max - min + 1) + min);//10~99中的一个整数
};

// 获取指定长度随机字符串
export const getRandomStr = (len: number) => {
  try {
    const num = Math.ceil(len / 8);
    let str = '';
    for (let index = 0; index < num; index++) {
      str += randomStr();
    }
    return str.slice(0, len);
  } catch (e) {
    return '';
  }
};

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {/*精确检测变量类型。call函数指定要测试的对象。返回一个字符串，该字符串以 [object] 的形式标识了对象的构造类型。*/
    return;
  }/*     首先检查 params 是否是一个对象。如果不是，函数直接返回不做任何处理。      */

  for (const key in params) {
    const format = params[key]?.format ?? null;/*     判断这个值有没有format方法，否则为空      */
    if (format && typeof format === 'function') {     params[key] = params[key].format(DATE_TIME_FORMAT);/*     传入DATE_TIME_FORMAT格式化该参数     */     }/*     判断format是否可以被调用且是一个函数      */
    if (isString(key)) {/*      如果键本身（key）是一个字符串，那么函数会检查与该键关联的值     */
      const value = params[key];
      if (value) {    try {     params[key] = isString(value) ? value.trim() : value;/*如果value是字符串，则去掉两边的空白字符，否则保留原来的值*/      } catch (error: any) {throw new Error(error);}    }
    }
    if (isObject(params[key])) {      formatRequestDate(params[key]);     }/*     如果值（params[key]）本身是一个对象，那么函数会递归地调用自身来对那个嵌套对象中的日期进行格式化      */
  }
}
