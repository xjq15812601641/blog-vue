// 转成二级路由
import { routeModule } from '/@/modules/store-module/variable/storeVariable';
import { cloneDeep, omit } from 'lodash-es';
import { createRouter, createWebHashHistory, Router, RouteRecordNormalized } from 'vue-router';
import { storeRouteRecordRaw } from '/@/modules/store-module/interface/storeRouteRecordRaw';

export function flatMultiLevelRoutes(routeModules: routeModule[]) {
  const modules: routeModule[] = cloneDeep(routeModules);
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index];
    if (!isMultipleRoute(routeModule)) {
      continue;
    }
    /* 层级超过两级处理 */
    promoteRouteLevel(routeModule);
  }
  return modules;
}

// Routing level upgrade
function promoteRouteLevel(routeModule: routeModule) {
  // console.log('routeModule', routeModule);
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'));
}
function isMultipleRoute(routeModule: routeModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
function addToChildren(
  routes: RouteRecordNormalized[],
  children: storeRouteRecordRaw[],
  routeModule: routeModule,
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    const route = routes.find((item) => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    // console.log('routeModule.children:', routeModule.children, 'route', route);
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as routeModule);
      // console.log('add', routeModule.children);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}
