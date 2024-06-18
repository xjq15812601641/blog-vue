/**
 * 返回应用的环境模式
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}
