<template>
  <div :class="getClass" ref="wrapperRef">
    <PageHeader
      :ghost="ghost"
      :title="title"
      v-bind="omit($attrs, 'class')"
      ref="headerRef"
      v-if="getShowHeader">
      <template #default>
        <template v-if="content">{{ content }}</template>
        <slot name="headerContent" v-else></slot>
      </template>
      <template #[item]="data" v-for="item in getHeaderSlots">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </PageHeader>

    <div class="overflow-hidden" :class="getContentClass" :style="getContentStyle" ref="contentRef">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { CSSProperties, provide } from 'vue';
  import { defineComponent, computed, watch, ref, unref } from 'vue';
  import { omit } from 'lodash-es';
  import { PageHeader } from 'ant-design-vue';
  import { PageWrapperProp } from "/@/modules/component-module/page-module/variable/pageProps";
  import { PageWrapperFixedHeightKey } from "/@/modules/component-module/page-module/variable/pageVariable";
  import { useContentHeight } from "/@/modules/component-module/page-module/method/useContentHeight";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  export default defineComponent({
    name: 'PageWrapper',
    components: { PageHeader },
    inheritAttrs: false,
    // 定义组件的 props
    props: PageWrapperProp,

    setup(props, { slots, attrs }) {
      const wrapperRef = ref(null);
      const headerRef = ref(null);
      const contentRef = ref(null);
      const footerRef = ref(null);
      const { prefixCls } = useDesign('page-wrapper');

      provide(PageWrapperFixedHeightKey, computed(() => props.fixedHeight),);/*   父组件提供数据，子组件注入数据   */

      const getIsContentFullHeight = computed(() => {   return props.contentFullHeight;   });/*   返回内容区域高度为全高度   */

      const getUpwardSpace = computed(() => props.upwardSpace);/*   返回上方空间高度   */

      const { redoHeight, setCompensation, contentHeight } = useContentHeight(
        getIsContentFullHeight,
        wrapperRef,
        [headerRef, footerRef],
        [contentRef],
        getUpwardSpace,
      );
      setCompensation({ useLayoutFooter: true, elements: [footerRef] });

      const getClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--dense`]: props.dense,
          },
          attrs.class ?? {},
        ];
      });
      const getShowHeader = computed(
        () => props.content || slots?.headerContent || props.title || getHeaderSlots.value.length,
      );

      const getShowFooter = computed(() => slots?.leftFooter || slots?.rightFooter);

      const getHeaderSlots = computed(() => {
        return Object.keys(omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent'));
      });

      const getContentStyle = computed((): CSSProperties => {
        const { contentFullHeight, contentStyle, fixedHeight } = props;
        if (!contentFullHeight) {
          return { ...contentStyle };
        }

        const height = `${unref(contentHeight)}px`;
        return {
          ...contentStyle,
          minHeight: height,
          ...(fixedHeight ? { height } : {}),
        };
      });

      const getContentClass = computed(() => {
        const { contentBackground, contentClass } = props;
        return [
          `${prefixCls}-content`,
          contentClass,
          {
            [`${prefixCls}-content-bg`]: contentBackground,
          },
        ];
      });

      watch(
        () => [getShowFooter.value],
        () => {
          redoHeight();
        },
        {
          flush: 'post',
          immediate: true,
        },
      );

      return {
        getContentStyle,
        wrapperRef,
        headerRef,
        contentRef,
        footerRef,
        getClass,
        getHeaderSlots,
        prefixCls,
        getShowHeader,
        getShowFooter,
        omit,
        getContentClass,
      };
    },
  });
</script>
<style lang="less">
  // 定义样式前缀
  @prefix-cls: ~'@{namespace}-page-wrapper';

  // 页面包装器样式
  .@{prefix-cls} {
    position: relative;

    // 内容区域样式
    .@{prefix-cls}-content {
      margin: 16px;
    }

    // Ant Design 页面标题样式
    .ant-page-header {
      &:empty {
        padding: 0;
      }
    }

    // 内容区域背景色样式
    &-content-bg {
      background-color: @component-background;
    }

    // 紧凑模式样式
    &--dense {
      .@{prefix-cls}-content {
        margin: 0;
      }
    }
  }

</style>
