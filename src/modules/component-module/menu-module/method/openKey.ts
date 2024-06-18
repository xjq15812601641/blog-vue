import { computed, Ref, toRaw, unref } from "vue";
import { MenuModeEnum } from "/@/enums/menuEnum";
import { MenuState } from "/@/modules/component-module/menu-module/interface/MenuState";
import { Menu } from "/@/modules/menuConfig-module/interface/menu";
import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
import { useTimeoutFn } from "@vueuse/shared";
import { uniq } from "lodash-es";
import { getAllParentPath } from "/@/modules/menuConfig-module/method/getAllParentPath";

export class OpenKey {
  getOpenKeys: Ref<string[]>
  menuState: MenuState;
  menus: Ref<Menu[]>;
  mode: Ref<MenuModeEnum>;
  accordion: Ref<boolean>;
  getCollapsed: Ref<boolean>;

  constructor(menuState, menus, mode, accordion) {
    this.menuState = menuState;
    this.menus = menus;
    this.mode = mode;
    this.accordion = accordion;
    this.getCollapsed = useMenuSetting().getCollapsed;
    // 根据菜单的折叠状态，返回相应的展开状态数组
    this.getOpenKeys = computed(() => {
      const collapse = unref(this.getCollapsed);
      return collapse ? menuState.collapsedOpenKeys : menuState.openKeys;
    });
  }
  // 传入的路径设置菜单的展开状态
  async setOpenKeys(path: string) {
    if (this.mode.value === MenuModeEnum.horizontal) {
      return;
    }
    const native: boolean = false;
    const isNotNative: any = !native;
    useTimeoutFn(
      () => {
        const menuList = toRaw(this.menus.value);
        if (menuList?.length === 0) {
          this.menuState.openKeys = [];
          return;
        }
        if (!unref(this.accordion)) {
          this.menuState.openKeys = uniq([...this.menuState.openKeys, ...getAllParentPath(menuList, path)]);
        } else {
          this.menuState.openKeys = getAllParentPath(menuList, path);
        }
      },
      16,
      isNotNative,
    );
  }
  /**
   * @description:  重置值
   */
  resetKeys() {
    this.menuState.selectedKeys = [];
    this.menuState.openKeys = [];
  }
  handleOpenChange(openKeys: string[]) {
    if (unref(this.mode) === MenuModeEnum.horizontal || !unref(this.accordion)) {
      this.menuState.openKeys = openKeys;
    } else {
      // const menuList = toRaw(menus.value);
      // getAllParentPath(menuList, path);
      const rootSubMenuKeys: string[] = [];
      for (const { children, path } of unref(this.menus)) {
        if (children && children.length > 0) {
          rootSubMenuKeys.push(path);
        }
      }
      if (!unref(this.getCollapsed)) {
        const latestOpenKey = openKeys.find((key) => this.menuState.openKeys.indexOf(key) === -1);
        if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
          this.menuState.openKeys = openKeys;
        } else {
          this.menuState.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      } else {
        this.menuState.collapsedOpenKeys = openKeys;
      }
    }
  }
}

