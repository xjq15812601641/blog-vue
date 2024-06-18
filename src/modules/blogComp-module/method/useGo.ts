// 返回一个go函数，传参后用于页面跳转，进行页面导航
import { RouteLocationRaw, Router, useRouter } from "vue-router";
import { isString } from "/@/utils/is/is";
import { handleError } from "@vue/runtime-core";

export function useGo(_router?: Router) {
  // _router:路由实例
  let router;
  !_router && (router = useRouter());

  const { push, replace } = _router || router;
  function go(opt = '/dashboard', isReplace = false) {
    // opt:要导航到的页面——PageEnum.BASE_HOME='/dashboard'
    // isReplace：表示是否使用 replace 方法进行导航，默认为 false
    if (!opt) {
      return;
    }
    //handleError 处理导航错误的函数
    // 将 opt 强制类型转换为 RouteLocationRaw 类型
    // Vue Router 的 push 和 replace 方法接受的参数类型是 RouteLocationRaw
    const o = opt as RouteLocationRaw;
    if (isString(opt)) {
      // 如果 opt 是一个字符串，根据 isReplace 的值选择使用 replace 方法或 push 方法进行导航。
      //由于isReplace=false，使用push方法导航
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    } else {
      // 如果 opt 是一个路由对象，也根据 isReplace 的值选择使用 replace 方法或 push 方法进行导航。
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}
