import { CacheSetting } from '/@/modules/cache-module/interface/cacheSetting';

export interface CacheMemory<T = any, V = any> {
  /**
   * 要设置的缓存内容
   */
  cache: { [key in keyof T]?: CacheSetting<V> };
  /**
   * 设置缓存存活时间
   */
  alive: number;
  getCache(): { [key in keyof T]?: CacheSetting<V> };
  setCache(cache: { [key in keyof T]?: CacheSetting<V> }): void;
  getCacheByKey<K extends keyof T>(key: K): CacheSetting<V> | undefined;
  setCacheByExpires<K extends keyof T>(key: K, value: V, expires?: number): V;
  removeCacheByKey<K extends keyof T>(key: K): V | undefined;
  resetCache(cache: { [key in keyof T]: CacheSetting<V> }): void;
  clearAllCache(): void;
}
