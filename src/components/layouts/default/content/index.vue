<template>
  <div :class="[prefixCls]" v-loading="getOpenPageLoading && getPageLoading">
    <div class="base-page"><PageLayout /></div>
    <LayoutFooter class="relative" />
  </div>
</template>
<script lang="ts" setup name="LayoutContent">
  import PageLayout from '/@/components/layouts/page/index.vue';
  import { createAsyncComponent } from "/@/modules/component-module/layout-module/method/header/createAsyncComponent";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  import { useTransitionSetting } from "/@/modules/component-module/layout-module/method/setting/useTransitionSetting";
  import { useRootSetting } from "/@/modules/component-module/layout-module/method/setting/rootSetting";
  import { useContentViewHeight } from "/@/modules/component-module/layout-module/method/default/content/useContentViewHeight";

  const LayoutFooter = createAsyncComponent(() => import('/@/views/dashboard/Footer.vue'));
  const { prefixCls } = useDesign('layout-content');
  const { getOpenPageLoading } = useTransitionSetting();
  const { getPageLoading } = useRootSetting();

  useContentViewHeight();
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    margin-top: 48px;
    position: relative;
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    z-index: 2;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }

    &-loading {
      position: absolute;
      top: 200px;
      z-index: @page-loading-z-index;
    }

    .rain {
      position: absolute;
      width: 2px;
      height: 45px;
      background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.6));
    }

    .base-page {
      min-height: calc(100vh - 226px);
    }
  }
</style>
