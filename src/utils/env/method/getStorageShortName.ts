import pkg from '../../../../package.json';
import { getCommonStoragePrefix } from '/@/utils/env/method/getCommonStoragePrefix';
/**
 * 返回缓存键，根据版本生成缓存密钥
 */
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}
