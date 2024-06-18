/**
 * 使字符串的第一个字符大写
 */
export function upperFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
