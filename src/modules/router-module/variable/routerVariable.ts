import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { defineComponent } from '@vue/runtime-core';
import { getRouterBasicOption } from '/@/modules/router-module/method/routerBasicOption';

export const WHITE_NAME_LIST: string[] = [];
export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>);
export const basicRoutes = getRouterBasicOption();
export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH), // 使用 createWebHistory 创建基于浏览器历史记录的路由模式
  routes: basicRoutes as unknown as RouteRecordRaw[], // 将 basicRoutes 数组强制转换为 RouteRecordRaw[] 类型
  strict: true, // 启用严格模式
  scrollBehavior: () => ({ left: 0, top: 0 }), // 设置路由切换时的滚动行为
});
