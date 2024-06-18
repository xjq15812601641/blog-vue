<template>
  <span :class="`${prefixCls}- flex items-center `">
    <Icon v-if="getIcon" :icon="getIcon" :size="18" :class="`${prefixCls}-wrapper__icon mr-2`" />
    {{ props.item?.name || '测试菜单' }}
  </span>
</template>
<script lang="ts" setup name="MenuItemContent">
  import { computed } from 'vue';
  import Icon from '/@/components/Icon/Icon.vue';
  import { contentProps } from "/@/modules/component-module/menu-module/variable/menuProps";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";

  const props = defineProps(contentProps);
  const { prefixCls } = useDesign('basic-menu-item-content');
  const getIcon = computed(() => props.item?.icon);
</script>
