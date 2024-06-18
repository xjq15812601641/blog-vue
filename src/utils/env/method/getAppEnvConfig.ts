import { getConfigFileName } from '/@/utils/env/method/getConfigFileName';
import { GlobEnvConfig } from '/@/utils/env/interface/GlobEnvConfig';
import { warn } from '/@/utils/log/method/warn';

/**
 * 返回应用环境的配置属性
 */
export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  // 如果是开发环境，将 import.meta.env 的类型断言为 GlobEnvConfig 类型
  // 如果是生产环境，从 window 对象中获取 ENV_NAME 属性的值
  const ENV = (import.meta.env.DEV
    ? (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;

  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_LOGO_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_COMMON_URL,
  } = ENV; //解析属性

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_LOGO_NAME)) {
    //使用正则表达式 /^[a-zA-Z\_]*$/ 对 VITE_GLOB_LOGO_NAME 进行测试。
    // 如果测试结果为 false，即 VITE_GLOB_LOGO_NAME 不符合只包含字母和下划线的规则。
    // 输出警告信息，提示用户将 VITE_GLOB_LOGO_NAME 修改为只包含字符和下划线的值。
    warn(
      `VITE_GLOB_LOGO_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  } //确保 VITE_GLOB_LOGO_NAME 的值符合特定的命名规范

  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_LOGO_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_COMMON_URL,
  };
}
