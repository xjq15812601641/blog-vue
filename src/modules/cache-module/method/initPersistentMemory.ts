import { localCacheStorage, memory } from "/@/modules/cache-module/variable/cacheVariable";
import { CacheEnum } from "/@/enums/cacheEnum";
import { omit, pick } from "lodash-es";

export function initPersistentMemory() {
  const localCache = localCacheStorage.get(CacheEnum.APP_LOCAL_CACHE_KEY);
  localCache && memory.resetCache(localCache);
  window.addEventListener('beforeunload', function () {
    // TOKEN_KEY 在登录或注销时已经写入到storage了，此处为了解决同时打开多个窗口时token不同步的问题
    // LOCK_INFO_KEY 在锁屏和解锁时写入，此处也不应修改
    localCacheStorage.set(CacheEnum.APP_LOCAL_CACHE_KEY, {
      ...omit(memory.getCache, CacheEnum.LOCK_INFO_KEY),
      ...pick(localCacheStorage.get(CacheEnum.APP_LOCAL_CACHE_KEY), [CacheEnum.TOKEN_KEY, CacheEnum.USER_INFO_KEY, CacheEnum.LOCK_INFO_KEY]),
    });
  });
}
