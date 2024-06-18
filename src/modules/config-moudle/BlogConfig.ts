import { toggleClass } from '/@/modules/theme_module/method/toggleClass';
import { BlogConfigStore } from '/@/modules/store-module/variable/storeVariable';
import { BlogTheme } from '/@/modules/theme_module/BlogTheme';
import { cacheClear } from '/@/modules/cache-module/method/cacheClear';

export class BlogConfig {
  static setBlogConfig(localConfig) {
    const {
      mode_gray,
      color_weak,
      headerSetting: {},
      menuSetting: {},
    } = localConfig;
    mode_gray && toggleClass(mode_gray, 'gray-mode');
    color_weak && toggleClass(color_weak, 'color-weak');
    BlogConfigStore.setProjectConfig(localConfig);
    setTimeout(() => {
      BlogTheme.getCanvas(localConfig.canvas);
      cacheClear();
    }, 20);
  }
}
