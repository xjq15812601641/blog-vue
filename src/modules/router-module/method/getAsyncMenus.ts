import { appPermissionStore } from "/@/modules/store-module/method/appPermissionStore";
import { BlogCache } from "/@/modules/cache-module/BlogCache";
import { ProjectKeyEnum } from "/@/enums/projectkeyEnum";

export function getAsyncMenus() {
  const permissionStore = appPermissionStore();
  // console.log(`permissionStore.getFrontMenuList.`, permissionStore.getFrontMenuList);
  const menuList = BlogCache.getCache(ProjectKeyEnum.userinfo_key) ? permissionStore.getBackMenuList : permissionStore.getFrontMenuList;
  // console.log('getToken===>', getToken(), permissionStore.getFrontMenuList);
  return menuList.filter((item) => !item.hideMenu);
  // return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu);
}
