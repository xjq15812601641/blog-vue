<template>
  <div @click="openDrawer(true)">
    <Icon icon="ion:settings-outline" />
    <SettingDrawer @register="register" /><!--主题设置-->
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SettingDrawer from './SettingDrawer';
  import Icon from "/@/components/Icon/Icon.vue";
  import { useDrawer } from "/@/modules/component-module/drawer-module/method/useDrawer";

  export default defineComponent({
    name: 'SettingButton',
    components: { SettingDrawer, Icon },
    setup() {
      const [register, { openDrawer }] = useDrawer();
      return {
        register,
        openDrawer,
      };
    },
  });
</script>
