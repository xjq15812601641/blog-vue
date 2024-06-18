import { findPath } from "/@/utils/helper/method/findPath";
import { Menu } from "/@/modules/menuConfig-module/interface/menu";

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
  return (menuList || []).map((item) => item.path);
}
