import { CacheMemory } from '/@/modules/cache-module/interface/cacheMemory';
import { CacheSetting } from '/@/modules/cache-module/interface/cacheSetting';

export const cacheDetailOption = <T = any, V = any>(): CacheMemory<T, V> => {
  return {
    cache: {},
    alive: 60 * 60 * 24 * 7,

    /**
     * 以下方法对cache进行详细设置
     */
    getCache() {
      return this.cache;
    },
    setCache(cache) {
      this.cache = cache;
    },
    /**
     * 通过传入的key获取缓存储存的value
     */
    getCacheByKey<K extends keyof T>(key: K) {
      return this.cache[key];
    },
    /**
     * 判断是否过去来设置新的本地缓存
     */
    setCacheByExpires<K extends keyof T>(key: K, value: V, expires?: number) {
      /**
       * @param key（缓存的键值）
       * @param value（要缓存的数据）
       * @param expires（缓存的过期时间）
       */
      /**
       * 如果 expires 参数未传入或者传入的值小于等于 0，则将 expires 设置为 Memory 类的实例属性 alive 的值，即缓存的默认过期时间
       */
      if (!expires || (expires as number) <= 0) {
        expires = this.alive;
      }
      /**
       * 获取指定 key 对应的缓存项 item
       * 如果该缓存项存在，则清除之前设置的定时器（timeoutId），并更新缓存项的 value 值为传入的 value。
       * 如果缓存项不存在，则创建一个新的缓存项 item，包含 value 和 expires 属性，并将其存储在 Memory 类的 cache 对象中。
       */
      let item = this.getCacheByKey(key);
      if (item) {
        if (item.timeoutId) {
          clearTimeout(item.timeoutId);
          item.timeoutId = undefined;
        }
        item.value = value;
      } else {
        item = { value, alive: expires };
        this.cache[key] = item;
      }
      /**
       * 计算缓存项的过期时间
       * 将当前时间加上 expires，得到新的缓存项的过期时间
       * 并使用 setTimeout 方法设置定时器，在过期时间后调用 remove 方法移除该缓存项。
       */
      if (!expires) {
        return value;
      }
      const now = new Date().getTime();
      item.time = now + this.alive;
      item.timeoutId = setTimeout(
        () => {
          this.removeCacheByKey(key);
        },
        expires > now ? expires - now : expires,
      );
      return value;
    },
    /**
     * 通过传入的key移除缓存储存的value
     */
    removeCacheByKey<K extends keyof T>(key: K) {
      const item = this.getCacheByKey(key);
      Reflect.deleteProperty(this.cache, key);
      if (item) {
        clearTimeout(item.timeoutId!);
        return item.value;
      }
    },
    /**
     * 重新设置缓存
     */
    resetCache(cache: { [K in keyof T]: CacheSetting }) {
      Object.keys(cache).forEach((key) => {
        const k = key as any as keyof T;
        const item = cache[k];
        if (item && item.time) {
          const now = new Date().getTime();
          const expire = item.time;
          if (expire > now) {
            this.setCacheByExpires(k, item.value, expire);
          }
        }
      });
    },
    /**
     * 清空所有缓存
     */
    clearAllCache() {
      Object.keys(this.cache).forEach((key) => {
        const item = this.cache[key];
        item.timeoutId && clearTimeout(item.timeoutId);
      });
      this.cache = {};
    },
  };
};
