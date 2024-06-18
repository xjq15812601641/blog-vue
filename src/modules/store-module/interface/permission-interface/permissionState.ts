import { PermissionMenu } from "/@/modules/store-module/interface/permission-interface/permissionMenu";

export interface PermissionState {
  isDynamicAddedRoute: boolean; // 路由是否动态添加
  lastBuildMenuTime: number; // 触发菜单更新
  frontMenuList: PermissionMenu[];
  backMenuList: PermissionMenu[];
}
