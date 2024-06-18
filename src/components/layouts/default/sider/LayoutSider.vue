<template>
  <Sider v-show="showClassSideBarRef"
    ref="sideRef"
    breakpoint="lg"
    collapsible
    :class="getSiderClass"
    :width="getMenuWidth"
    :collapsed="getCollapsed"
    :collapsedWidth="getCollapsedWidth"
    @breakpoint="onBreakpointChange"
    :trigger="getTrigger"
    v-bind="getTriggerAttr"
  >

    <template #trigger v-if="getShowTrigger">
      <LayoutTrigger />
    </template><!--当 getShowTrigger 的值为真时，会渲染名为 trigger 的具名插槽，并在插槽内容区域中插入 LayoutTrigger 组件。-->
    <LayoutMenu  :menuMode="getMode" :splitType="getSplitType" />
  </Sider>
</template>
<script lang="ts">
  import { computed, defineComponent, ref, unref, CSSProperties, h } from 'vue';
  import { Layout } from 'ant-design-vue';
  import LayoutMenu from '../menu/index.vue';
  import LayoutTrigger from '/@/components/layouts/default/trigger/index.vue';
  import { MenuModeEnum } from '/@/enums/menuEnum';
  import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
  import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";
  import { MenuSplitTyeEnum } from "/@/enums/menuSplitTyeEnum";
  import { useTrigger } from "/@/modules/component-module/layout-module/method/sider/useTrigger";
  import { useSiderEvent } from "/@/modules/component-module/layout-module/method/sider/useSiderEvent";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";

  export default defineComponent({
    name: 'LayoutSideBar',
    components: { Sider: Layout.Sider, LayoutMenu, LayoutTrigger },
    setup() {
      const sideRef = ref<ElRef>(null);

      const {
        getCollapsed,
        getMenuWidth,
        getSplit,
        getRealWidth,
        getMenuHidden,
        getMenuFixed,
        getIsMixMode,
        toggleCollapsed,
      } = useMenuSetting();

      const { prefixCls } = useDesign('layout-sideBar');

      const { getIsMobile } = useAppInject();

      const { getTriggerAttr, getShowTrigger } = useTrigger(getIsMobile);

      const { getCollapsedWidth, onBreakpointChange } = useSiderEvent();

      const getMode = computed(() => {
        return unref(getSplit) ? MenuModeEnum.inline : null;
      });

      const getSplitType = computed(() => {
        return unref(getSplit) ? MenuSplitTyeEnum.LEFT : MenuSplitTyeEnum.NONE;
      });

      const showClassSideBarRef = computed(() => {
        return unref(getSplit) ? !unref(getMenuHidden) : true;
      });

      const getSiderClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: unref(getMenuFixed),
            [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(getIsMobile),
          },
        ];
      });

      const getHiddenDomStyle = computed((): CSSProperties => {
        const width = `${unref(getRealWidth)}px`;
        return {
          width: width,
          overflow: 'hidden',
          flex: `0 0 ${width}`,
          maxWidth: width,
          minWidth: width,
          transition: 'all 0.2s',
        };
      });

      // 在此处使用计算量可能会导致sider异常
      // andv 更新后，如果trigger插槽可用，则此处代码可废弃
      const getTrigger = h(LayoutTrigger);

      return {
        prefixCls,
        sideRef,
        getIsMobile,
        getHiddenDomStyle,
        getSiderClass,
        getTrigger,
        getTriggerAttr,
        getCollapsedWidth,
        getMenuFixed,
        showClassSideBarRef,
        getMenuWidth,
        getCollapsed,
        onBreakpointChange,
        getMode,
        getSplitType,
        getShowTrigger,
        toggleCollapsed,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sideBar';

  .@{prefix-cls} {
    z-index: @layout-sider-fixed-z-index;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    &--mix {
      top: @header-height;
      height: calc(100% - @header-height);
    }

    &.ant-layout-sider-dark {
      background-color: @sider-dark-bg-color;

      .ant-layout-sider-trigger {
        color: darken(@white, 25%);
        background-color: @trigger-dark-bg-color;

        &:hover {
          color: @white;
          background-color: @trigger-dark-hover-bg-color;
        }
      }
    }

    &:not(.ant-layout-sider-dark) {
      // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);

      .ant-layout-sider-trigger {
        color: @text-color-base;
        border-top: 1px solid @border-color-light;
      }
    }

    .ant-layout-sider-zero-width-trigger {
      top: 40%;
      z-index: 10;
    }

    & .ant-layout-sider-trigger {
      height: 36px;
      line-height: 36px;
    }
  }
</style>
