<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Switch
      v-bind="getBindValue"
      @change="handleChange"
      :disabled="disabled"
      checkedChildren="开"
      unCheckedChildren="关"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Switch } from 'ant-design-vue';
  import { SwitchItemProp } from "/@/modules/component-module/layout-module/variable/layoutProps";
  import { baseHandler } from "/@/modules/component-module/layout-module/method/setting/baseHandler";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";


  export default defineComponent({
    name: 'SwitchItem',
    components: { Switch },
    props: SwitchItemProp,
    setup(props) {
      const { prefixCls } = useDesign('setting-switch-item');

      const getBindValue = computed(() => {
        return props.def ? { checked: props.def } : {};
      });
      function handleChange(e: ChangeEvent) {
        props.event && baseHandler(props.event, e);
      }
      return {
        prefixCls,
        handleChange,
        getBindValue,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-switch-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }
</style>
