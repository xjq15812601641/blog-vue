<template>
  <transition-group
    class="h-full w-full"
    v-bind="$attrs"
    ref="elRef"
    :name="transitionName"
    :tag="tag"
    mode="out-in"
  >
    <div key="component" v-if="isInit">
      <slot :loading="loading"></slot>
    </div>
    <div key="skeleton" v-else>
      <slot name="skeleton" v-if="$slots.skeleton"></slot>
      <Skeleton v-else />
    </div>
  </transition-group>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted, ref, toRef, toRefs } from 'vue';
  import { Skeleton } from 'ant-design-vue';
  import { LazyContainerProp } from "/@/modules/component-module/container-module/variable/containerProps";
  import { State } from "/@/modules/component-module/container-module/interface/State";
  import { useIntersectionObserver } from "/@/modules/component-module/container-module/method/useIntersectionObserver";
  import { useTimeoutFn } from "/@/modules/blogComp-module/method/useTimeoutFn";

  export default defineComponent({
    name: 'LazyContainer',
    components: { Skeleton },
    inheritAttrs: false,
    props: LazyContainerProp,
    emits: ['init'],
    setup(props, { emit }) {
      const elRef = ref();
      const state = reactive<State>({
        isInit: false,
        loading: false,
        intersectionObserverInstance: null,
      });
      onMounted(() => {
        immediateInit();
        initIntersectionObserver();
      });
      function immediateInit() {
        const { timeout } = props;
        timeout &&
          useTimeoutFn(() => {
            init();
          }, timeout);
      }
      function init() {
        state.loading = true;
        useTimeoutFn(() => {
          if (state.isInit) return;
          state.isInit = true;
          emit('init');
        }, props.maxWaitingTime || 80);
      }

      function initIntersectionObserver() {
        const { timeout, direction, threshold } = props;
        if (timeout) return;
        // According to the scrolling direction to construct the viewport margin, used to load in advance
        let rootMargin = '0px';
        switch (direction) {
          case 'vertical':
            rootMargin = `${threshold} 0px`;
            break;
          case 'horizontal':
            rootMargin = `0px ${threshold}`;
            break;
        }

        try {
          const { stop, observer } = useIntersectionObserver({
            rootMargin,
            target: toRef(elRef.value, '$el'),
            onIntersect: (entries: any[]) => {
              const isIntersecting = entries[0].isIntersecting || entries[0].intersectionRatio;
              if (isIntersecting) {
                init();
                if (observer) {
                  stop();
                }
              }
            },
            root: toRef(props, 'viewport'),
          });
        } catch (e) {
          init();
        }
      }
      return {
        elRef,
        ...toRefs(state),
      };
    },
  });
</script>
