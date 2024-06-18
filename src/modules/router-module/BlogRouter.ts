import {
  basicRoutes,
  router,
  WHITE_NAME_LIST
} from "/@/modules/router-module/variable/routerVariable";
import { App } from 'vue';
import { getRouteNames } from "/@/modules/router-module/method/getRouteNames";

export class BlogRouter {
  // 白名单应该包含基本静态路由
  static resetRouter() {
    router.getRoutes().forEach((route) => {
      const { name } = route;
      if (name && !WHITE_NAME_LIST.includes(name as string)) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
  }
  static setupRouter(app: App<Element>) {
    getRouteNames(basicRoutes)
    app.use(router); // 将路由实例添加到应用程序中
  }
}
