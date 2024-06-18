<template>
  <div :class="prefixCls">
    <CollapseHeader v-bind="props" :prefixCls="prefixCls" :show="show" @expand="handleExpand">
      <template #title>
        <slot name="title"></slot>
      </template>
      <template #action>
        <slot name="action"></slot>
      </template>
    </CollapseHeader>

    <div class="p-2">
      <CollapseTransition :enable="canExpan">
        <Skeleton v-if="loading" :active="loading" />
        <div :class="`${prefixCls}__body`" v-else v-show="show">
          <slot></slot>
        </div>
      </CollapseTransition>
    </div>
    <div :class="`${prefixCls}__footer`" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRefs } from "vue";
  import { Skeleton } from 'ant-design-vue';
  import CollapseHeader from './CollapseHeader.vue';
  import CollapseTransition from "/@/components/Transition/CollapseTransition.vue";
  import { triggerWindowResize } from "/@/modules/component-module/container-module/method/triggerWindowResize";
  import { useTimeoutFn } from "/@/modules/blogComp-module/method/useTimeoutFn";
  import { CollapseContainerProp } from "/@/modules/component-module/container-module/variable/containerProps";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";

  const { prefixCls } = useDesign('collapse-container');
  const props = defineProps(CollapseContainerProp);
  const show = ref(true);
  function handleExpand() {
    show.value = !show.value;
    if (props.triggerWindowResize) {
      //这里的 200 毫秒是因为扩展有动画
      useTimeoutFn(triggerWindowResize, 200);
    }
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-collapse-container';

  .@{prefix-cls} {
    background-color: @component-background;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;

    &__header {
      display: flex;
      height: 32px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid @border-color-light;
    }

    &__footer {
      border-top: 1px solid @border-color-light;
    }

    &__action {
      display: flex;
      text-align: right;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>
