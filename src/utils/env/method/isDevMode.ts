/**
 * 返回当前应用是否处于开发模式
 */
export function isDevMode(): boolean {
  return !import.meta.env.DEV;
}
