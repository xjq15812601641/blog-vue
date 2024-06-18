import { PermissionMenu } from '/@/modules/store-module/interface/permission-interface/permissionMenu';
import { RouteParams } from 'vue-router';
import { toRaw } from '@vue/runtime-core';

export function configureDynamicParamsMenu(menu: PermissionMenu, params: RouteParams) {
  const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g;
  const { path, paramPath } = toRaw(menu);
  let realPath = paramPath ? paramPath : path;
  const matchArr = realPath.match(menuParamRegex);

  matchArr?.forEach((it) => {
    const realIt = it.substr(1);
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string);
    }
  });
  if (!paramPath && matchArr && matchArr.length > 0) {
    menu.paramPath = path;
  }
  menu.path = realPath;
  // children
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params));
}
