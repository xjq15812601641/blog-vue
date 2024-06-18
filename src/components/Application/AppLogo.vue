<!--Logo 图标和标题-->
<template>
  <!--  存放博客昵称的一个div-->
  <div class="anticon" :class="getAppLogoClass" @click="goHome">
    <div class="ml-2 truncate md:opacity-100" :class="getTitleClass" v-show="showTitle">
      斯汪の博客
    </div>
  </div>
</template>
<script lang="ts" setup>
  import {
    appLogoProps
  } from "/@/modules/component-module/application-module/variable/applicationProps";
  import { computed } from "vue";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  import { useGo } from "/@/modules/blogComp-module/method/useGo";

  const props = defineProps(appLogoProps);
  const { prefixCls } = useDesign('app-logo');
  const getAppLogoClass = computed(() => [prefixCls, props.theme]);
  const getTitleClass = computed(() => [
    `${prefixCls}__title`,
    { 'xs:opacity-0': !props.alwaysShowTitle },
  ]);
  const go = useGo();
  function goHome() {
    go('/dashboard');
  }
</script>

<style lang="less" scoped>
  //@prefix-cls 是一个 Less 变量，用于存储一个字符串值
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
      line-height: normal;
    }
  }
</style>
