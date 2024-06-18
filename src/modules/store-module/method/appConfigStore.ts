import { defineStore } from 'pinia';
import { ConfigState } from '/@/modules/store-module/interface/config-interface/configState';
import { BlogCache } from '/@/modules/cache-module/BlogCache';
import { ProjectKeyEnum } from '/@/enums/projectkeyEnum';
import { BeforeMiniState } from '/#/store';
import { ConfigOption } from '/@/modules/config-moudle/interface/configOption';
import { ConfigHeader } from '/@/modules/store-module/interface/config-interface/configHeader';
import { MenuSetting, TransitionSetting } from '/#/config';
import { deepMerge } from '/@/utils/BlogUtils';
import { BlogRouter } from '/@/modules/router-module/BlogRouter';

export const appConfigStore = defineStore({
  id: 'configStore',
  state: (): ConfigState => ({
    pageLoading: false,
    appConfig: BlogCache.getCache(ProjectKeyEnum.projectConfig_key),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoadingState(): boolean {
      return this.pageLoading;
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getAppConfig(): ConfigOption {
      return this.appConfig || ({} as ConfigOption);
    },
    getHeaderSetting(): ConfigHeader {
      return this.getAppConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getAppConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getAppConfig.transitionSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    /* 设置项目基本配置 */
    setProjectConfig(config: DeepPartial<ConfigOption>): void {
      this.appConfig = deepMerge(this.appConfig || {}, config);
      BlogCache.setCache(ProjectKeyEnum.projectConfig_key, this.appConfig);
    },

    async resetAllState() {
      BlogRouter.resetRouter();
      BlogCache.clearCache();
    },

    async setPageLoadingAction(loading: boolean): Promise<void> {
      let timeId;
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
  },
});
