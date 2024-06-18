import { CacheSetting } from "/@/modules/cache-module/interface/cacheSetting";

export class Memory<T = any, V = any> {
  private cache: { [key in keyof T]?: CacheSetting<V> } = {};
  private alive: number; // 缓存多长时间 单位：秒

  constructor(alive = 0) {
    this.alive = alive * 1000;
  }

  get getCache() {
    return this.cache;
  }

  setCache(cache) {
    this.cache = cache;
  }

  getCacheByKey<K extends keyof T>(key: K) {
    return this.cache[key];
  }

  setCacheByExpires<K extends keyof T>(key: K, value: V, expires?: number) {
    let item = this.getCacheByKey(key);

    if (!expires || (expires as number) <= 0) {
      expires = this.alive;
    }
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
  }

  removeCacheByKey<K extends keyof T>(key: K) {
    const item = this.getCacheByKey(key);
    Reflect.deleteProperty(this.cache, key);
    if (item) {
      clearTimeout(item.timeoutId!);
      return item.value;
    }
  }

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
  }

  clearAllCache() {
    Object.keys(this.cache).forEach((key) => {
      const item = this.cache[key];
      item.timeoutId && clearTimeout(item.timeoutId);
    });
    this.cache = {};
  }
}
