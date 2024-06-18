import { cacheDefaultOption } from '/@/modules/cache-module/method/cacheDefaultOption';
import { cacheOperate } from '/@/modules/cache-module/method/cacheOperate';
import { CacheSetting } from '/@/modules/cache-module/interface/cacheSetting';
import { Memory } from "/@/modules/cache-module/method/memory";
export const cache: { [key in keyof any]?: CacheSetting<any> } = {};
export const memory = new Memory(60 * 60 * 24 * 7);

const basicOptions = cacheDefaultOption();
export const localCacheStorage = cacheOperate(basicOptions);
