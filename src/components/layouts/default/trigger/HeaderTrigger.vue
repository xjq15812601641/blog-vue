<template>
  <span :class="[prefixCls]" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="getCollapsed" /><!--表示菜单处于折叠状态时的状态-->
    <MenuFoldOutlined v-else /><!--表示菜单处于展开状态时的状态-->
  </span>
</template>
<script lang="ts" setup name="HeaderTrigger">
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
  import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  const { getCollapsed, toggleCollapsed } = useMenuSetting();
  const { prefixCls } = useDesign('layout-header-trigger');
</script>
