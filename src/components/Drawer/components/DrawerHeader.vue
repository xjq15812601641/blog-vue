<template>
  <BasicTitle v-if="!isDetail" :class="prefixCls">
    <slot name="title"></slot>
    {{ !$slots.title ? title : '' }}
  </BasicTitle>

  <div :class="[prefixCls, `${prefixCls}--detail`]" v-else>
    <span :class="`${prefixCls}__twrap`">
      <span @click="handleClose" v-if="showDetailBack">
        <ArrowLeftOutlined :class="`${prefixCls}__back`" />
      </span>
      <span v-if="title">{{ title }}</span>
    </span>

    <span :class="`${prefixCls}__toolbar`">
      <slot name="titleToolbar"></slot>
    </span>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { ArrowLeftOutlined } from '@ant-design/icons-vue';
  import { drawerHeaderProp } from "/@/modules/component-module/drawer-module/variable/drawerProps";
  import { BasicTitle } from "/@/modules/component-module/basic-module/variable/basicVariable";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  export default defineComponent({
    name: 'BasicDrawerHeader',
    components: { BasicTitle, ArrowLeftOutlined },
    props: drawerHeaderProp,
    emits: ['close'],
    setup(_, { emit }) {
      const { prefixCls } = useDesign('basic-drawer-header');
      function handleClose() {
        emit('close');
      }
      return { prefixCls, handleClose };
    },
  });
</script>

<style lang="less">
  @drawer_header_prefix: ~'@{namespace}-basic-drawer-header';
  @footer-height: 60px;
  .@{drawer_header_prefix} {
    display: flex;
    height: 100%;
    align-items: center;

    &__back {
      padding: 0 12px;
      cursor: pointer;

      &:hover {
        color: @primary-color;
      }
    }

    &__twrap {
      flex: 1;
    }

    &__toolbar {
      padding-right: 50px;
    }
  }
</style>
