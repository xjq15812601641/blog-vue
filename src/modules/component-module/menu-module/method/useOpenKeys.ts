import { computed, Ref, toRaw, unref } from "vue";
import { MenuModeEnum } from "/@/enums/menuEnum";
import { MenuState } from "/@/modules/component-module/menu-module/interface/MenuState";

import { useTimeoutFn } from "@vueuse/shared";
import { uniq } from "lodash-es";
import { getAllParentPath } from "/@/modules/menuConfig-module/method/getAllParentPath";
import { Menu } from "/@/modules/menuConfig-module/interface/menu";
import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";


export function useOpenKeys(
  menuState: MenuState,
  menus: Ref<Menu[]>,
  mode: Ref<MenuModeEnum>,
  accordion: Ref<boolean>,
) {
  const { getCollapsed } = useMenuSetting();

  // 传入的路径设置菜单的展开状态
  async function setOpenKeys(path: string) {
    if (mode.value === MenuModeEnum.horizontal) {
      return;
    }
    const native = false;
    const isNotNative: any = !native;

    useTimeoutFn(
      () => {
        const menuList = toRaw(menus.value);
        if (menuList?.length === 0) {
          menuState.openKeys = [];
          return;
        }
        if (!unref(accordion)) {
          menuState.openKeys = uniq([...menuState.openKeys, ...getAllParentPath(menuList, path)]);
        } else {
          menuState.openKeys = getAllParentPath(menuList, path);
        }
      },
      16,
      isNotNative,
    );
  }

  // 根据菜单的折叠状态，返回相应的展开状态数组
  const getOpenKeys = computed(() => {
    const collapse = unref(getCollapsed);

    return collapse ? menuState.collapsedOpenKeys : menuState.openKeys;
  });

  /**
   * @description:  重置值
   */
  function resetKeys() {
    menuState.selectedKeys = [];
    menuState.openKeys = [];
  }

  // 处理菜单展开状态变化的事件
  function handleOpenChange(openKeys: string[]) {
    if (unref(mode) === MenuModeEnum.horizontal || !unref(accordion)) {
      menuState.openKeys = openKeys;
    } else {
      // const menuList = toRaw(menus.value);
      // getAllParentPath(menuList, path);
      const rootSubMenuKeys: string[] = [];
      for (const { children, path } of unref(menus)) {
        if (children && children.length > 0) {
          rootSubMenuKeys.push(path);
        }
      }
      if (!unref(getCollapsed)) {
        const latestOpenKey = openKeys.find((key) => menuState.openKeys.indexOf(key) === -1);
        if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
          menuState.openKeys = openKeys;
        } else {
          menuState.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      } else {
        menuState.collapsedOpenKeys = openKeys;
      }
    }
  }
  return { setOpenKeys, resetKeys, getOpenKeys, handleOpenChange };
}
