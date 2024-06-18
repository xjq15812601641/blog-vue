import { RouteLocationNormalized, Router, RouteRecordRaw } from "vue-router";
import { BlogPermissionStore, BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
import { BlogCache } from '/@/modules/cache-module/BlogCache';
import { ProjectKeyEnum } from '/@/enums/projectkeyEnum';
import { PermissionMenu } from '/@/modules/store-module/interface/permission-interface/permissionMenu';
import { configureDynamicParamsMenu } from '/@/modules/store-module/method/configureDynamicParamsMenu';
import { getRawRoute } from "/@/modules/guard-moudle/method/getRawRoute";
import { emitter, key } from "/@/modules/guard-moudle/variable/guardVariable";
import { basicRoutes } from "/@/modules/router-module/variable/routerVariable";
import { Scroll } from "/@/modules/scroll-moduole/scroll";

export let lastChangeTab: RouteLocationNormalized;
export class BlogGuard {

  static createPageGuard(router: Router) {
    const loadedPageMap = new Map<string, boolean>(); // 创建一个 Map 用于保存页面加载状态
    router.beforeEach(async (to) => {
      to.meta.loaded = !!loadedPageMap.get(to.path); // 根据页面加载状态设置 meta.loaded 属性
      const r = getRawRoute(to);
      emitter.emit(key, r);
      lastChangeTab = r;
      return true; // 返回 true 继续导航
    });
    router.afterEach((to) => {
      loadedPageMap.set(to.path, true); // 标记页面为已加载
      const el = document.querySelector('.sup-layout-content'); // 查找指定的元素
      el && new Scroll({ el: document.querySelector('.sup-layout-content'), to: 0, duration: 100 }).run()
    });
  }
  static createStateGuard(router: Router) {
    router.afterEach((to) => {
      if (to.path === '/login'){
        emitter.clear();
      }
    });
  }
  static createParamMenuGuard(router: Router) {
    const blackList = ['/profile/index', '/article/publish'];
    BlogPermissionStore.buildRoutesAction();
    router.beforeEach(async (to, _, next) => {
      if (blackList.includes(to.path) && !BlogCache.getCache(ProjectKeyEnum.token_key)) {
        next('/404');
      }

      if (BlogCache.getCache(ProjectKeyEnum.token_key) && to.path === '/login') {
        next(_.path);
      }

      if (to.path === '/') {
        next('/dashboard');
      }
      // filter no name route
      if (!to.name) {
        next();
        return;
      }

      // menu has been built.
      if (!BlogPermissionStore.getIsDynamicAddedRoute) {
        next();
        return;
      }
      let menus: PermissionMenu[] = [];
      const result = BlogCache.getCache(ProjectKeyEnum.token_key);
      result ? (menus = BlogPermissionStore.getBackMenuList) : (menus = BlogPermissionStore.getFrontMenuList);
      menus.forEach((item) => configureDynamicParamsMenu(item, to.params));
      next();
    });
  }
  static createPermissionGuard(router: Router) {
    router.beforeEach(async (to, from, next) => {
      if (
        from.path === '/dashboard' &&
        to.path === '/dashboard' &&
        BlogUserStore.getUserInfo.homePath &&
        BlogUserStore.getUserInfo.homePath !== '/dashboard'
      ) {
        next(BlogUserStore.getUserInfo.homePath);
        return;
      }

      if (to.path === '/') {
        next('/dashboard');
      }

      const token = BlogUserStore.getToken;
      if (!token) {
        // 您可以在未经许可的情况下访问。您需要将路由 meta.ignoreAuth 设置为 true
        if (to.meta.ignoreAuth) {
          next();
          return;
        }

        // redirect login page
        const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
          path: '/login',
          replace: true,
        };
        if (to.path) {
          redirectData.query = {
            ...redirectData.query,
            redirect: to.path,
          };
        }
        next(redirectData);
        return;
      }

      // Jump to the 404 page after processing the login
      if (
        from.path === '/login' &&
        to.name === 'PageNotFound' &&
        to.fullPath !== (BlogUserStore.getUserInfo.homePath || '/dashboard')
      ) {
        next(BlogUserStore.getUserInfo.homePath || '/dashboard');
        return;
      }

      if (BlogPermissionStore.getIsDynamicAddedRoute) {
        next();
        return;
      }

      const routes = await BlogPermissionStore.buildRoutesAction();

      routes.forEach((route) => {
        router.addRoute(route as unknown as RouteRecordRaw);
      });

      router.addRoute(basicRoutes.find(route => route.name === 'PageNotFound') as unknown as RouteRecordRaw);

      BlogPermissionStore.setDynamicAddedRoute(true);

      if (to.name === 'PageNotFound') {
        // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
        next({ path: to.fullPath, replace: true, query: to.query });
      } else {
        const redirectPath = (from.query.redirect || to.path) as string;
        const redirect = decodeURIComponent(redirectPath);
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
        next(nextData);
      }
    });
  }

  static listenerRouteChange(
    callback: (route: RouteLocationNormalized) => void,
    immediate = true,
  ) {
    emitter.on(key, callback);
    immediate && lastChangeTab && callback(lastChangeTab);
  }
}
