import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export function isDevFn(mode: string): boolean {
  return mode === 'development';
}

export function isProdFn(mode: string): boolean {
  return mode === 'production';
}

/**
 * 将字符串类型的true/false转换为对应的布尔值。
 *
 * 如果变量名是’VITE_PORT’，将变量值转换为Number类型。
 *
 * 如果变量名是’VITE_PROXY’且变量值不为空，尝试将变量值转换为JSON对象。
 *
 * 将处理后的值赋值给ret对象，并根据值的类型将其转换为string格式并存储在process.env中。
 * */export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {};

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    // realName为变量值
    realName = realName === 'true' ? true : realName === 'false' ? false : realName; // 字符串true/false转布尔值

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = '';
      }
    }
    ret[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName);
    }
    /* process.env中的变量的值均为string类型 */
  }
  return ret;
}

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script;
  const reg = new RegExp('--mode ([a-z_\\d]+)');
  const result = reg.exec(script as string) as any;
  if (result) {
    const mode = result[1] as string;
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig = {};
  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${item}`, e);
    }
  });
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}

export function getRootPath(...dir: string[]) {
  return path.resolve(process.cwd(), ...dir);
}
