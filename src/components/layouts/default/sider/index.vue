<template>
  <Drawer
    v-if="getIsMobile"
    placement="left"
    :class="prefixCls"
    :width="getMenuWidth"
    :getContainer="null"
    :visible="!getCollapsed"
    @close="handleClose"
  >
    <Sider /><!--竖列模式的导航栏列表-->
  </Drawer><!--左侧弹出。-->
  <Sider v-else />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import Sider from './LayoutSider.vue';
  import { Drawer } from 'ant-design-vue';
  import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";
  import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  export default defineComponent({
    name: 'SiderWrapper',
    components: { Sider, Drawer },
    setup() {
      const { prefixCls } = useDesign('layout-sider-wrapper');
      const { getIsMobile } = useAppInject();
      const { setMenuSetting, getCollapsed, getMenuWidth, getIsMixSidebar } = useMenuSetting();

      function handleClose() {
        setMenuSetting({
          collapsed: true,
        });
      }

      return { prefixCls, getIsMobile, getCollapsed, handleClose, getMenuWidth, getIsMixSidebar };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sider-wrapper';

  .@{prefix-cls} {
    .ant-drawer-body {
      height: 100vh;
      padding: 0;
    }

    .ant-drawer-header-no-title {
      display: none;
    }
  }
</style>
