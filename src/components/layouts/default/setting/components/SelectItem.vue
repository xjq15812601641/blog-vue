<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <Select
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      @change="handleChange"
      :disabled="disabled"
      size="small"
      :options="options"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Select } from 'ant-design-vue';
  import { SelectItemProp } from "/@/modules/component-module/layout-module/variable/layoutProps";
  import { baseHandler } from "/@/modules/component-module/layout-module/method/setting/baseHandler";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";


  export default defineComponent({
    name: 'SelectItem',
    components: { Select },
    props: SelectItemProp,
    setup(props) {
      const { prefixCls } = useDesign('setting-select-item');
      const getBindValue = computed(() => {
        return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {};
      });

      function handleChange(e: ChangeEvent) {
        baseHandler(props.event!, e);
      }
      console.log(props);
      return {
        prefixCls,
        handleChange,
        getBindValue,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-select-item';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-select {
      width: 126px;
    }
  }
</style>
