<template>
  <Menu
    :selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :mode="mode"
    :openKeys="getOpenKeys"
    :inlineIndent="inlineIndent"
    @open-change="handleOpenChange"
    :class="getMenuClass"
    @click="handleMenuClick"
    :subMenuOpenDelay="0.2"
    v-bind="getInlineCollapseOptions"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem :item="item" :isHorizontal="isHorizontal" />
    </template>
  </Menu>
</template>
<script lang="ts">
  import { computed, defineComponent, unref, reactive, watch, toRefs, ref } from 'vue';
  import { Menu } from 'ant-design-vue';
  import BasicSubMenuItem from './components/BasicSubMenuItem.vue';
  import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
  import { basicProps } from "/@/modules/component-module/menu-module/variable/menuProps";
  import { MenuState } from "/@/modules/component-module/menu-module/interface/MenuState";
  import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
  import { listenerRouteChange } from "/@/modules/menuConfig-module/method/listenerRouteChange";
  import { getAllParentPath } from "/@/modules/menuConfig-module/method/getAllParentPath";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  import { useOpenKeys } from "/@/modules/component-module/menu-module/method/useOpenKeys";

  export default defineComponent({
    name: 'BasicMenu',
    components: {
      Menu,
      BasicSubMenuItem,
    },
    props: basicProps,
    emits: ['menuClick'],
    setup(props, { emit }) {
      const isClickGo = ref(false);
      const currentActiveMenu = ref('');

      const menuState = reactive<MenuState>({
        defaultSelectedKeys: [],
        openKeys: [],
        selectedKeys: [],
        collapsedOpenKeys: [],
      });

      const { prefixCls } = useDesign('basic-menu');
      const { items, mode, accordion } = toRefs(props);

      const { getCollapsed } = useMenuSetting();

      const { currentRoute } = useRouter();

      const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
        menuState,
        items,
        mode as any,
        accordion,
      );

      const getIsTopMenu = computed(() => {
        const { type, mode } = props;

        return (
          (type === MenuTypeEnum.topMenu && mode === MenuModeEnum.horizontal) || props.isHorizontal
        );
      });

      const getMenuClass = computed(() => {
        return [
          prefixCls,
          `justify-left`,
          {
            [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
          },
        ];
      });

      const getInlineCollapseOptions = computed(() => {
        const isInline = props.mode === MenuModeEnum.inline;

        const inlineCollapseOptions: { inlineCollapsed?: boolean } = {};
        if (isInline) {
          inlineCollapseOptions.inlineCollapsed = props.mixSider ? false : unref(getCollapsed);
        }
        return inlineCollapseOptions;
      });

      listenerRouteChange((route) => {
        if (route.name === 'Redirect') return;
        handleMenuChange(route);
        currentActiveMenu.value = route.meta?.currentActiveMenu as string;

        if (unref(currentActiveMenu)) {
          menuState.selectedKeys = [unref(currentActiveMenu)];
          setOpenKeys(unref(currentActiveMenu));
        }
      });

      !props.mixSider &&
        watch(
          () => props.items,
          () => {
            handleMenuChange();
          },
        );

      async function handleMenuClick({ key }: { key: string; keyPath: string[] }) {
        // const { beforeClickFn } = props;
        // if (beforeClickFn && isFunction(beforeClickFn)) {
        //   const flag = await beforeClickFn(key);
        //   if (!flag) return;
        // }
        emit('menuClick', key);

        isClickGo.value = true;
        menuState.selectedKeys = [key];
      }

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path =
          (route || unref(currentRoute)).meta?.currentActiveMenu ||
          (route || unref(currentRoute)).path;
        setOpenKeys(path);
        if (unref(currentActiveMenu)) return;
        // if (props.isHorizontal && unref(getSplit)) {
        //   const parentPath = await getCurrentParentPath(path);
        //   menuState.selectedKeys = [parentPath];
        // } else {
        const parentPaths = await getAllParentPath(props.items, path);
        menuState.selectedKeys = parentPaths;
        // }
      }

      return {
        handleMenuClick,
        getInlineCollapseOptions,
        getMenuClass,
        handleOpenChange,
        getOpenKeys,
        ...toRefs(menuState),
      };
    },
  });
</script>
<style lang="less">
  @import 'index.less';
</style>
