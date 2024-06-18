/* 监听路由改变 */
import { RouteLocationNormalized } from "vue-router";
import { emitter, key } from "/@/modules/guard-moudle/variable/guardVariable";
import { lastChangeTab } from "/@/modules/guard-moudle/BlogGuard";

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  // console.log('lastChangeTab', lastChangeTab);
  emitter.on(key, callback);
  immediate && lastChangeTab && callback(lastChangeTab);
}
