import { EncryptionParams } from '/@/utils/cipher';

export interface CacheStorage extends EncryptionParams {
  /**
   * env定义的项目名称+package.json定义的版本
   */
  prefixKey: string;
  /**
   * 浏览器目前存储的本地缓存
   */
  storage: Storage;
  /**
   * 根据环境决定是否加密
   */
  hasEncrypt: boolean;
  /**
   * 设置超时时间
   */
  timeout?: Nullable<number>;
}
