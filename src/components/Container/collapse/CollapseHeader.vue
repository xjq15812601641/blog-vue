<template>
  <div :class="[`${prefixCls}__header px-2 py-5`, $attrs.class]">
    <div :class="`${prefixCls}__action`">
      <slot name="action"></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  import { CollapseHeaderProp } from "/@/modules/component-module/container-module/variable/containerProps";

  const props = CollapseHeaderProp;
  export default defineComponent({
    inheritAttrs: false,
    props,
    emits: ['expand'],
  });
</script>
