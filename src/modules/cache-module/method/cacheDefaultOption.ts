/* 生成存储配置 */
import { isDevMode } from '/@/utils/env/method/isDevMode';
import { getStorageShortName } from '/@/utils/env/method/getStorageShortName';
import { cacheKeyOption } from '/@/modules/cache-module/method/cacheKeyOption';
import { CacheStorage } from '/@/modules/cache-module/interface/cacheStorage';

/**
 * @param hasEncrypt:当前运行的环境模式
 * @param storage：浏览器当前存储的缓存
 * @param prefixKey:env定义的项目名称+package.json定义的版本
 * @param options：参数可选的CacheStorageParams
 */
export const cacheDefaultOption = (): Partial<CacheStorage> => {
  return {
    hasEncrypt: !isDevMode(),
    storage: localStorage,
    prefixKey: getStorageShortName(),
    timeout: 60 * 60 * 24 * 7,
    iv: localStorage.getItem('lIv') || cacheKeyOption(),
    key: localStorage.getItem('lKey') || cacheKeyOption(),
  };
};
