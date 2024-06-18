<template>
  <span :class="BasicClass">
    <Icon icon="ion:chevron-forward" :style="$attrs.iconStyle" />
  </span>
</template>
<script lang="ts" setup>
  import Icon from '/@/components/Icon/Icon.vue';
  import { basicArrowProps } from "/@/modules/component-module/basic-module/variable/basicProps";
  import { computed, toRef, toRefs } from "vue";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";

  const { prefixCls } = useDesign('basic-arrow')
  const props = defineProps(basicArrowProps);
  const BasicClass = computed(() => {
    const { expand, up, down, inset } = toRefs(props);
    return [
      prefixCls,
      {
        [`${prefixCls}--active`]: expand,
        up,
        inset,
        down,
      },
    ];
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-arrow';

  .@{prefix-cls} {
    display: inline-block;
    cursor: pointer;
    transform: rotate(0deg);
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;

    &--active {
      transform: rotate(90deg);
    }

    &.inset {
      line-height: 0px;
    }

    &.up {
      transform: rotate(-90deg);
    }

    &.down {
      transform: rotate(90deg);
    }

    &.up.@{prefix-cls}--active {
      transform: rotate(90deg);
    }

    &.down.@{prefix-cls}--active {
      transform: rotate(-90deg);
    }
  }
</style>
