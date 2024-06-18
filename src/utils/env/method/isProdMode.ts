/**
 * 返回是否处于生产模式
 */
export function isProdMode(): boolean {
  return !import.meta.env.PROD;
}
