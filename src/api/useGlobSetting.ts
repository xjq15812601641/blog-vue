import { GlobConfig } from "/#/config";
import { getAppEnvConfig } from "/@/utils/env/method/getAppEnvConfig";
import { warn } from "/@/utils/log/method/warn";

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_LOGO_NAME,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_COMMON_URL,
  } = getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_LOGO_NAME)) {
    warn(
      `VITE_GLOB_LOGO_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
    );
  }

  /* 全局配置.env变量 */
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    logoName: VITE_GLOB_LOGO_NAME,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadCommonUrl: VITE_GLOB_UPLOAD_COMMON_URL,
  };
  return glob as Readonly<GlobConfig>;
};
