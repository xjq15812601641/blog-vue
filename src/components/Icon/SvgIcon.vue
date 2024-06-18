<template>
  <svg
    :class="[prefixCls, $attrs.class, spin && 'svg-icon-spin']"
    :style="SvgStyle"
    aria-hidden="true"
  >
    <use :xlink:href="SymbolId" />
  </svg>
</template>
<script lang="ts" setup name="svgIcon">
  import { IconComp } from '/@/modules/component-module/icon-module/iconComp';
  import { svgIconProps } from "/@/modules/component-module/icon-module/variable/iconProps";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  const SvgIconProps = defineProps(svgIconProps);
  const SymbolId = IconComp.getSymbolId(SvgIconProps);
  const SvgStyle = IconComp.getSvgStyle(SvgIconProps);
  const { prefixCls } = useDesign('svg-icon');
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-svg-icon';

  .@{prefix-cls} {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }

  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
