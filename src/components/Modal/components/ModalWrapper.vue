<template>
  <ScrollContainer ref="wrapperRef">
    <div ref="spinRef" :style="spinStyle" v-loading="loading" :loading-tip="loadingTip">
      <slot></slot>
    </div>
  </ScrollContainer>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue';
  import {
    defineComponent,
    computed,
    ref,
    watchEffect,
    unref,
    watch,
    onMounted,
    nextTick,
    onUnmounted,
  } from 'vue';
  import { useMutationObserver } from '@vueuse/core';
  import { modalWrapperProps } from "/@/modules/component-module/modal-module/variable/modalProps";
  import ScrollContainer from "/@/components/Container/ScrollContainer.vue";
  import { useWindowSizeFn } from "/@/modules/window-module/method/useWindowSizeFn";
  import { createModalContext } from "/@/modules/component-module/table-module/method/modalContext/createModalContext";


  export default defineComponent({
    name: 'ModalWrapper',
    components: { ScrollContainer },
    inheritAttrs: false,
    props: modalWrapperProps,
    emits: ['height-change', 'ext-height'],
    setup(props, { emit }) {
      const wrapperRef = ref<ComponentRef>(null);
      const spinRef = ref<ElRef>(null);
      const realHeightRef = ref(0);
      const minRealHeightRef = ref(0);

      let realHeight = 0;

      let stopElResizeFn: Fn = () => {};

      useWindowSizeFn(setModalHeight.bind(null, false));

      useMutationObserver(
        spinRef,
        () => {
          setModalHeight();
        },
        {
          attributes: true,
          subtree: true,
        },
      );

      createModalContext({
        redoModalHeight: setModalHeight,
      });

      const spinStyle = computed((): CSSProperties => {
        return {
          minHeight: `${props.minHeight}px`,
          [props.fullScreen ? 'height' : 'maxHeight']: `${unref(realHeightRef)}px`,
        };
      });

      watchEffect(() => {
        props.useWrapper && setModalHeight();
      });

      watch(
        () => props.fullScreen,
        (v) => {
          setModalHeight();
          if (!v) {
            realHeightRef.value = minRealHeightRef.value;
          } else {
            minRealHeightRef.value = realHeightRef.value;
          }
        },
      );

      onMounted(() => {
        const { modalHeaderHeight, modalFooterHeight } = props;
        emit('ext-height', modalHeaderHeight + modalFooterHeight);
      });

      onUnmounted(() => {
        stopElResizeFn && stopElResizeFn();
      });

      async function scrollTop() {
        nextTick(() => {
          const wrapperRefDom = unref(wrapperRef);
          if (!wrapperRefDom) return;
          (wrapperRefDom as any)?.scrollTo?.(0);
        });
      }

      async function setModalHeight() {
        // 解决在弹窗关闭的时候监听还存在,导致再次打开弹窗没有高度
        // 加上这个,就必须在使用的时候传递父级的visible
        if (!props.visible) return;
        const wrapperRefDom = unref(wrapperRef);
        if (!wrapperRefDom) return;

        const bodyDom = wrapperRefDom.$el.parentElement;
        if (!bodyDom) return;
        bodyDom.style.padding = '0';
        await nextTick();

        try {
          const modalDom = bodyDom.parentElement && bodyDom.parentElement.parentElement;
          if (!modalDom) return;

          const modalRect = getComputedStyle(modalDom as Element).top;
          const modalTop = Number.parseInt(modalRect);
          let maxHeight =
            window.innerHeight -
            modalTop * 2 +
            (props.footerOffset! || 0) -
            props.modalFooterHeight -
            props.modalHeaderHeight;

          // 距离顶部过进会出现滚动条
          if (modalTop < 40) {
            maxHeight -= 26;
          }
          await nextTick();
          const spinEl = unref(spinRef);

          if (!spinEl) return;
          await nextTick();
          // if (!realHeight) {
          realHeight = spinEl.scrollHeight;
          // }

          if (props.fullScreen) {
            realHeightRef.value =
              window.innerHeight - props.modalFooterHeight - props.modalHeaderHeight - 28;
          } else {
            realHeightRef.value = props.height
              ? props.height
              : realHeight > maxHeight
              ? maxHeight
              : realHeight;
          }
          emit('height-change', unref(realHeightRef));
        } catch (error) {
          console.log(error);
        }
      }

      return { wrapperRef, spinRef, spinStyle, scrollTop, setModalHeight };
    },
  });
</script>
