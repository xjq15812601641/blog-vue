import { ConfigOption } from '/@/modules/config-moudle/interface/configOption';
import { BlogCache } from '/@/modules/cache-module/BlogCache';
import { ProjectKeyEnum } from '/@/enums/projectkeyEnum';
import { deepMerge } from '/@/utils/BlogUtils';
import { projectOption } from "/@/modules/config-moudle/variable/configVariable";
import { BlogConfigStore } from "/@/modules/store-module/variable/storeVariable";
import { BlogTheme } from "/@/modules/theme_module/BlogTheme";
import { initPersistentMemory } from "/@/modules/cache-module/method/initPersistentMemory";

export function initAppConfig() {
  initPersistentMemory()
  //定义项目设置初始值
  const basicProjCfg = JSON.parse(JSON.stringify(projectOption));
  //从缓存中拿出本地存储的项目设置
  const localConfig: ConfigOption = BlogCache.getCache(ProjectKeyEnum.projectConfig_key) as ConfigOption;
  //将初始值和本地值合并，然后再setBlogConfig里先定义开关，然后存入缓存，最后监听开启特效
  BlogConfigStore.setProjectConfig(deepMerge(basicProjCfg, localConfig || {}));
  setTimeout(() => {
    BlogTheme.getCanvas(localConfig.canvas)
  }, 20);
}
