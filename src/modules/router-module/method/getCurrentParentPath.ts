import { getAllParentPath } from "/@/modules/menuConfig-module/method/getAllParentPath";
import { getAsyncMenus } from "/@/modules/router-module/method/getAsyncMenus";

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();
  const allParentPath = await getAllParentPath(menus, currentPath);
  // console.log('allParenPath', allParentPath);
  return allParentPath?.[0];
}
