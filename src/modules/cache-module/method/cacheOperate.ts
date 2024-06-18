import { CacheStorage } from '/@/modules/cache-module/interface/cacheStorage';
import { AesEncryption } from '/@/utils/cipher';
import { isNullOrUnDef } from '/@/utils/is/is';

export const cacheOperate = ({
  prefixKey = '',
  storage = localStorage,
  key,
  iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CacheStorage> = {}) => {
  const WebStorage = class WebStorage {
    /* 类的私有属性 */
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption; // 类  包含AES加解密方法
    private hasEncrypt: boolean; // 是否加密 production环境加密

    constructor() {
      /* 实例的属性 */
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = new AesEncryption({ key, iv });
      this.hasEncrypt = hasEncrypt;
      localStorage.setItem('lKey', key as string);
      localStorage.setItem('lIv', iv as string);
    }

    /* 设置缓存 */
    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(`${this.prefixKey}${key}`.toUpperCase(), stringifyValue);
    }

    /* 获取缓存 */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(`${this.prefixKey}${key}`.toUpperCase());
      if (!val) return def;

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (e) {
        return def;
      }
    }

    /* 删除缓存 */
    remove(key: string) {
      this.storage.removeItem(`${this.prefixKey}${key}`.toUpperCase());
    }

    /* 清空缓存 */
    clear(): void {
      this.storage.clear();
    }
  };
  return new WebStorage();
};
