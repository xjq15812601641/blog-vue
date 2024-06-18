import { computed, Ref, toRaw, unref } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { uniq } from "lodash-es";
import { Menu } from "/@/modules/menuConfig-module/interface/menu";
import { useTimeoutFn } from "@vueuse/shared";
import { getAllParentPath } from "/@/modules/menuConfig-module/method/getAllParentPath";
import { MenuState } from "/@/modules/component-module/simpleMenu-module/interface/MenuState";

export function useOpenKeys(
  menuState: MenuState,
  menus: Ref<Menu[]>,
  accordion: Ref<boolean>,
  mixSider: Ref<boolean>,
  collapse: Ref<boolean>,
) {
  const debounceSetOpenKeys = useDebounceFn(setOpenKeys, 50);
  async function setOpenKeys(path: string) {
    const native: any = !mixSider.value;
    const menuList = toRaw(menus.value);
    useTimeoutFn(
      () => {
        if (menuList?.length === 0) {
          menuState.activeSubMenuNames = [];
          menuState.openNames = [];
          return;
        }
        const keys = getAllParentPath(menuList, path);

        if (!unref(accordion)) {
          menuState.openNames = uniq([...menuState.openNames, ...keys]);
        } else {
          menuState.openNames = keys;
        }
        // console.log('menuState.activeSubMenuNames', menuState.openNames);
        menuState.activeSubMenuNames = menuState.openNames;
      },
      30,
      native,
    );
  }

  const getOpenKeys = computed(() => {
    return unref(collapse) ? [] : menuState.openNames;
  });

  return { setOpenKeys: debounceSetOpenKeys, getOpenKeys };
}
