import { getAsyncMenus } from "/@/modules/router-module/method/getAsyncMenus";
import { Menu } from "/@/modules/menuConfig-module/interface/menu";

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus();
  return menus;
};
