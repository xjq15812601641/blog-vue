<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" v-bind="$attrs">
    <slot></slot>
  </Scrollbar>
</template>

<script lang="ts">
  import { defineComponent, ref, unref, nextTick } from 'vue';
  import { Scrollbar } from '/@/modules/component-module/scrollbar-module/variable/scrollbarVariable'
  import { ScrollbarType } from "/@/modules/component-module/scrollbar-module/interface/scrollbarType";
  import { Scroll } from "/@/modules/scroll-moduole/scroll";

  export default defineComponent({
    name: 'ScrollContainer',
    components: { Scrollbar },
    setup() {
      const scrollbarRef = ref<Nullable<ScrollbarType>>(null);

      /**
       * Scroll to the specified position
       */
      function scrollTo(to: number, duration = 500) {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return;
        }
        nextTick(() => {
          const wrap = unref(scrollbar.wrap);
          if (!wrap) {
            return;
          }
          const { run } = new Scroll({
            el: wrap,
            to,
            duration,
          });
          run();
        });
      }

      function getScrollWrap() {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return null;
        }
        return scrollbar.wrap;
      }

      /**
       * Scroll to the bottom
       */
      function scrollBottom() {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) {
          return;
        }
        nextTick(() => {
          const wrap = unref(scrollbar.wrap) as any;
          if (!wrap) {
            return;
          }
          const scrollHeight = wrap.scrollHeight as number;
          const { run } = new Scroll({
            el: wrap,
            to: scrollHeight,
          });
          run();
        });
      }

      return {
        scrollbarRef,
        scrollTo,
        scrollBottom,
        getScrollWrap,
      };
    },
  });
</script>
<style lang="less">
  .scroll-container {
    width: 100%;
    height: 100%;

    .scrollbar__wrap {
      margin-bottom: 18px !important;
      overflow-x: hidden;
    }

    .scrollbar__view {
      box-sizing: border-box;
    }
  }
</style>
