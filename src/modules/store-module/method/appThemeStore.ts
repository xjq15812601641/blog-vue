import { defineStore } from "pinia";
import { ThemeState } from "/@/modules/store-module/interface/themeState";

export const appThemeStore = defineStore({
  // 唯一标识符为 'app-theme'
  id: 'app-theme',

  // 定义了存储模块的初始状态
  state: (): ThemeState => ({
    // themeMap 属性初始化为空对象
    themeMap: {},
  }),

  // 用于获取主题数据存储模块的 themeMap 属性
  getters: {
    getThemeMap(): Recordable {
      return this.themeMap;
    },
  },

  // 设置主题数据存储模块的 themeMap 属性
  actions: {
    setThemeMap(themeMap: Recordable) {
      this.themeMap = themeMap;
    },
  },
});
