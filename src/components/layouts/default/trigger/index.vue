<template>
  <HeaderTrigger v-if="!sider" /><!--左上方导航栏变成折叠样式-->
</template>
<script lang="ts" setup name="LayoutTrigger">
  import HeaderTrigger from './HeaderTrigger.vue';
  import { TriggerProp } from "/@/modules/component-module/layout-module/variable/layoutProps";
  defineProps(TriggerProp);
</script>
