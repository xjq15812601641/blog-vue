import { getConfig } from "/@/utils/helper/variable/helperVariable";

export function treeToList<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T {
  config = getConfig(config);
  const { children } = config;
  const result: any = [...tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children!]) continue;
    result.splice(i + 1, 0, ...result[i][children!]);
  }
  return result;
}
