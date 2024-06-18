import { toRaw } from '@vue/runtime-core';
import { ProjectKeyEnum } from '/@/enums/projectkeyEnum';
import { localCacheStorage, memory } from '/@/modules/cache-module/variable/cacheVariable';
import { basicKey } from "/@/modules/store-module/variable/storeVariable";
import { CacheBasicKey } from "/@/modules/cache-module/interface/cacheBasicKey";

export class BlogCache {
  /* 获取缓存 */
  static getCache<T>(key: basicKey) {
    return memory.getCacheByKey(key)?.value as Nullable<T>;
  }

  /* 设置缓存 */
  static setCache(
    key: basicKey,
    value: CacheBasicKey[basicKey],
    immediate = false,
  ): void {
    memory.setCacheByExpires(key, toRaw(value));
    immediate && localCacheStorage.set(ProjectKeyEnum.localCache_key, memory.getCache);
  }

  /* 移除缓存 */
  static removeCache(key: basicKey, immediate = false): void {
    memory.removeCacheByKey(key);
    immediate && localCacheStorage.set(ProjectKeyEnum.localCache_key, memory.getCache);
  }

  /* 清空缓存 */
  static clearCache(immediate = false): void {
    memory.clearAllCache();
    immediate && localCacheStorage.clear();
  }
}
