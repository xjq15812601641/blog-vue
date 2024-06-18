import { getAppEnvConfig } from '/@/utils/env/method/getAppEnvConfig';
import { getEnv } from '/@/utils/env/method/getEnv';
/**
 * 返回存储前缀
 */
export function getCommonStoragePrefix() {
  const { VITE_GLOB_LOGO_NAME } = getAppEnvConfig();
  return `${VITE_GLOB_LOGO_NAME}__${getEnv()}`.toUpperCase();
}
