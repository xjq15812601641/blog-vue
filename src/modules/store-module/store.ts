import { createPinia } from 'pinia';

/**
 * 创建一个状态管理库实例 store
 * 在应用程序初始化时安装实例 store
 * 导出实例被整个应用使用
 */
export class Store {
  static getStore() {
    return createPinia();
  }
}
