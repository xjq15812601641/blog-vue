import { computed, ref, Ref, unref, watch } from "vue";
import { useRouter } from "vue-router";
import { Menu } from "/@/modules/menuConfig-module/interface/menu";
import { MenuSplitTyeEnum } from "/@/enums/menuSplitTyeEnum";
import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";
import { appPermissionStore } from "/@/modules/store-module/method/appPermissionStore";
import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
import { BlogCache } from "/@/modules/cache-module/BlogCache";
import { ProjectKeyEnum } from "/@/enums/projectkeyEnum";
import { getCurrentParentPath } from "/@/modules/router-module/method/getCurrentParentPath";
import { getMenus } from "/@/modules/router-module/method/getMenus";

export function useSplitMenu(splitType: Ref<MenuSplitTyeEnum>) {
  // MenuConfig array
  const menusRef = ref<Menu[]>([]);
  // console.log('useRouter===>', useRouter());
  const { currentRoute } = useRouter();
  const { getIsMobile } = useAppInject();
  const permissionStore = appPermissionStore();
  const { getIsHorizontal } = useMenuSetting();

  const splitNotLeft = computed(
    () => unref(splitType) !== MenuSplitTyeEnum.LEFT && !unref(getIsHorizontal),
  );

  const normalType = computed(() => {
    return unref(splitType) === MenuSplitTyeEnum.NONE;
  });

  const hasPermission = computed(() => {
    return BlogCache.getCache(ProjectKeyEnum.token_key);
  });

  watch(
    [() => hasPermission.value],
    () => {
      genMenus();
    },
    {
      immediate: true,
    },
  );

  watch(
    [() => unref(currentRoute).path, () => unref(splitType)],
    async ([path]: [string, MenuSplitTyeEnum]) => {
      if (unref(splitNotLeft) || unref(getIsMobile)) return;

      const { meta } = unref(currentRoute);
      const currentActiveMenu = meta.currentActiveMenu as string;
      let parentPath = await getCurrentParentPath(path);
      if (!parentPath) {
        parentPath = await getCurrentParentPath(currentActiveMenu);
      }
      parentPath;
    },
    {
      immediate: true,
    },
  );

  watch(
    [() => permissionStore.getLastBuildMenuTime],
    () => {
      genMenus();
    },
    {
      immediate: true,
    },
  );

  async function genMenus() {
    // normal mode
    if (unref(normalType) || unref(getIsMobile)) {
      menusRef.value = await getMenus();
      return;
    }
  }

  return { menusRef };
}
