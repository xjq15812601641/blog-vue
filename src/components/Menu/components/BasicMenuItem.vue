<template>
  <MenuItem :key="item.path">
    <MenuItemContent v-bind="$props" :item="item" />
  </MenuItem>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Menu } from 'ant-design-vue';
  import MenuItemContent from './MenuItemContent.vue';
  import { itemProps } from "/@/modules/component-module/menu-module/variable/menuProps";
  export default defineComponent({
    name: 'BasicMenuItem',
    components: { MenuItem: Menu.Item, MenuItemContent },
    props: itemProps,
    setup() {
      return {};
    },
  });
</script>
