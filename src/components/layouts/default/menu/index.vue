<script lang="tsx">
  import { computed, defineComponent, unref, toRef } from 'vue';
  import { LayoutMenuProp } from "/@/modules/component-module/page-module/variable/pageProps";
  import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
  import { useRootSetting } from "/@/modules/component-module/layout-module/method/setting/rootSetting";
  import { useSplitMenu } from "/@/modules/component-module/layout-module/method/menu/useSplitMenu";
  import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";
  import { MenuModeEnum } from "/@/enums/menuEnum";
  import { isUrl } from "/@/utils/is/is";
  import { useGo } from "/@/modules/blogComp-module/method/useGo";
  import BasicMenu from '/@/components/Menu/BasicMenu.vue'
  import SimpleMenu from '/@/components/SimpleMenu/SimpleMenu.vue'

  export default defineComponent({
    name: 'LayoutMenu',
    props: LayoutMenuProp,
    setup(props) {
      const go = useGo();

      const { getMenuMode, getMenuType, getCollapsed, getIsSidebarType, getSplit } = useMenuSetting();
      const { getShowLogo } = useRootSetting();

      const { menusRef } = useSplitMenu(toRef(props, 'splitType'));

      const { getIsMobile } = useAppInject();

      const getComputedMenuMode = computed(() =>
        unref(getIsMobile) ? MenuModeEnum.inline : props.menuMode || unref(getMenuMode),
      );

      const getIsShowLogo = computed(() => unref(getShowLogo) && unref(getIsSidebarType));

      const getCommonProps = computed(() => {
        const menus = unref(menusRef);
        return {
          menus,
          beforeClickFn: beforeMenuClickFn,
          items: menus,
          accordion: true,
          collapse: unref(getCollapsed),
          collapsedShowTitle: false,
          onMenuClick: handleMenuClick,
        };
      });

      function handleMenuClick(path: string) {
        go(path);
      }

      async function beforeMenuClickFn(path: string) {
        if (!isUrl(path)) {
          return true;
        }
        // openWindow(path);
        return false;
      }

      function renderMenu() {
        // 获取菜单数据
        const { menus, ...menuProps } = unref(getCommonProps);
        if (!menus || !menus.length) return null;
        return !props.isHorizontal ? (
          <SimpleMenu {...menuProps} isSplitMenu={unref(getSplit)} items={menus} class={'hehehe'} />
        ) : (
          <BasicMenu
            {...(menuProps as any)}
            isHorizontal={props.isHorizontal}
            type={unref(getMenuType)}
            showLogo={unref(getIsShowLogo)}
            mode={unref(getComputedMenuMode as any)}
            items={menus}
          />
        );
      }

      return () => {
        return <>{renderMenu()}</>;
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-menu';
  @logo-prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    &-logo {
      height: @header-height;
      padding: 10px 4px 10px 10px;

      img {
        width: @logo-width;
        height: @logo-width;
      }
    }

    &--mobile {
      .@{logo-prefix-cls} {
        &__title {
          opacity: 100%;
        }
      }
    }
  }
</style>
