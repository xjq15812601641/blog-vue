import { defineStore } from 'pinia';
import { PermissionState } from '/@/modules/store-module/interface/permission-interface/permissionState';
import { PermissionMenu } from '/@/modules/store-module/interface/permission-interface/permissionMenu';
import { storeRouteRecordRaw } from '/@/modules/store-module/interface/storeRouteRecordRaw';
import { BlogConfigStore } from '/@/modules/store-module/variable/storeVariable';
import { RoutePermissionEnum } from '/@/enums/routePermissionEnum';
import { BlogCache } from '/@/modules/cache-module/BlogCache';
import { ProjectKeyEnum } from '/@/enums/projectkeyEnum';
import { basicRoutes } from '/@/modules/router-module/variable/routerVariable';
import { projectOption } from '/@/modules/config-moudle/variable/configVariable';
import { transformRouteToMenu } from '/@/modules/store-module/method/permission-method/transformRouteToMenu';
import { flatMultiLevelRoutes } from '/@/modules/store-module/method/permission-method/flatMultiLevelRoutes';

export const appPermissionStore = defineStore({
  id: 'permissionStore',
  state: (): PermissionState => ({
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    frontMenuList: [],
    backMenuList: [],
  }),
  getters: {
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
    getFrontMenuList(): PermissionMenu[] {
      return this.frontMenuList;
    },
    getBackMenuList(): PermissionMenu[] {
      return this.backMenuList;
    },
  },
  actions: {
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },

    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },

    setFrontMenuList(list: PermissionMenu[]) {
      this.frontMenuList = list;
    },

    setBackMenuList(list: PermissionMenu[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },

    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.frontMenuList = [];
      this.lastBuildMenuTime = 0;
    },

    /* 构建路由 */
    async buildRoutesAction(): Promise<storeRouteRecordRaw[]> {
      let routes: storeRouteRecordRaw[] = [];
      BlogConfigStore.setProjectConfig({
        mode_permission: (projectOption.mode_permission = RoutePermissionEnum.back),
      });
      const permissionMode = BlogCache.getCache(ProjectKeyEnum.token_key)
        ? RoutePermissionEnum.back
        : RoutePermissionEnum.mapping;

      switch (permissionMode) {
        case RoutePermissionEnum.mapping:
          routes.push(...basicRoutes);
          const frontMenuList = transformRouteToMenu(routes, true);
          frontMenuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });

          this.setFrontMenuList(frontMenuList);
          // Convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;
        case RoutePermissionEnum.back:
          routes.push(...basicRoutes);
          const backMenuList = transformRouteToMenu(routes, true);
          backMenuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
          });
          this.setBackMenuList(backMenuList)
          routes = flatMultiLevelRoutes(routes);

          break;
      }
      return routes;
    },
  },
});
