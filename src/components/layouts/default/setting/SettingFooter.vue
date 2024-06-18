<template>
  <div :class="prefixCls">
    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <RedoOutlined class="mr-2" />
      重置
    </a-button>
  </div>
</template>
<script lang="ts" setup name="SettingFooter">
  import { RedoOutlined } from '@ant-design/icons-vue';
  import { unref } from 'vue';
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import { BlogConfigStore } from "/@/modules/store-module/variable/storeVariable";
  import { defaultSetting } from "/@/modules/blogComp-module/variable/BlogComponentVariable";
  import { toggleClass } from "/@/modules/theme_module/method/toggleClass";
  import { BlogTheme } from "/@/modules/theme_module/BlogTheme";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";



  const { prefixCls } = useDesign('setting-footer');
  const { createMessage } = BlogMessage.useMessage();

  function handleResetSetting() {
    try {
      BlogConfigStore.setProjectConfig(unref(defaultSetting));
      const { color_weak, mode_gray, canvas } = defaultSetting;
      // updateTheme(themeColor);
      toggleClass(color_weak, 'color-weak')
      toggleClass(mode_gray, 'gray-mode');
      BlogTheme.getCanvas(canvas);
      createMessage.success('重置成功');
    } catch (error: any) {
      createMessage.error(error);
    }
  }
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
