import { getCommonStoragePrefix } from '/@/utils/env/method/getCommonStoragePrefix';
import { getStorageShortName } from '/@/utils/env/method/getStorageShortName';
//删除无用的密钥
export function cacheClear() {
  /**
   * 通过不是该系统项目名称+版本来删除无用缓存
   */
  const commonPrefix = getCommonStoragePrefix();
  const shortPrefix = getStorageShortName();

  /**
   * 获取存储对象中所有的键并遍历
   * 判断是否以通用存储前缀开头，并且不以短前缀开头
   * 删除该键对应的存储项
   */
  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key);
      }
    });
  });
}
