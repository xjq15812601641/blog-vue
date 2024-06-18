<template>
  <Header :class="getHeaderClass">
    <div :class="`${prefixCls}-left`">
      <AppLogo
        v-if="getShowHeaderLogo || !getIsMobile"
        :class="`${prefixCls}-logo`"
        :style="getLogoWidth"
      />
      <LayoutTrigger
        v-if="
          (getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || getIsMobile
        "
        :sider="false"
      /><!--手机模式下折叠的样式-->
      <LayoutBreadcrumb v-if="getShowContent && getShowBread" /><!--网址结构-->
    </div>

    <div :class="`${prefixCls}-menu`" v-if="getShowTopMenu && !getIsMobile">
      <LayoutMenu :isHorizontal="true" :splitType="getSplitType" :menuMode="getMenuMode" /><!--导航栏所有按钮-->
    </div>

    <div :class="`${prefixCls}-action`">
      <Search /><!--搜索按钮-->
      <FullScreen v-if="getShowFullScreen" :class="`${prefixCls}-action__item fullscreen-item`" /><!--网站控制最大化最小化按钮-->
      <UserDropDown v-if="isLogined" /><!--登录成功按钮-->
      <UserAction v-else /><!--登录按钮-->
      <SettingDrawer :class="`${prefixCls}-action__item`" /><!--设置主题按钮-->
    </div>
  </Header>
</template>

<script lang="ts" setup>
  import AppLogo from "/@/components/Application/AppLogo.vue";
  import LayoutBreadcrumb from './components/Breadcrumb.vue'
  import Search from './components/Search.vue'
  import FullScreen from './components/FullScreen.vue'
  import UserDropDown from './components/user-dropdown/index.vue'
  import UserAction from './components/user-action/index.vue'
  import { computed, unref } from 'vue';
  import { Layout } from 'ant-design-vue';
  import LayoutMenu from '../menu/index.vue';
  import LayoutTrigger from '../trigger/index.vue';
  import SettingDrawer from '/@/components/layouts/default/setting/index.vue';
  import { propTypes } from "/@/utils/propType/propTypes";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
  import { useHeaderSetting } from "/@/modules/component-module/layout-module/method/useHeaderSetting";
  import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";
  import { MenuSplitTyeEnum } from "/@/enums/menuSplitTyeEnum";
  import { MenuModeEnum } from "/@/enums/menuEnum";
  import { BlogConfigStore, BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
  const Header = Layout.Header;


  const isLogined = computed(() => BlogUserStore.getToken);

  const props = defineProps({
    fixed: propTypes.bool,
  });
  const { prefixCls } = useDesign('layout-header');

  const {
    getShowTopMenu,
    getSplit,
    getIsMixMode,
    getMenuWidth,
    getShowHeaderTrigger,
    getIsMixSidebar,
  } = useMenuSetting();

  const { getShowFullScreen, getShowHeaderLogo, getShowContent, getShowBread } = useHeaderSetting();

  const { getIsMobile } = useAppInject();

  const getHeaderClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--fixed`]: props.fixed,
        [`${prefixCls}--mobile`]: unref(getIsMobile),
      },
    ];
  });

  const getLogoWidth = computed(() => {
    if (!unref(getIsMixMode) || unref(getIsMobile)) {
      return {};
    }
    const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
    return { width: `${width}px` };
  });

  const getSplitType = computed(() => {
    return unref(getSplit) ? MenuSplitTyeEnum.TOP : MenuSplitTyeEnum.NONE;
  });

  const getMenuMode = computed(() => {
    return unref(getSplit) ? MenuModeEnum.horizontal : null;
  });
</script>

<style lang="less">
  @import './index.less';
</style>
