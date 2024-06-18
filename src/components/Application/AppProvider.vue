<script lang="ts">
  import { defineComponent, ref, toRefs, unref } from 'vue';
  import { BlogWindow } from '/@/modules/window-module/BlogWindow';
  import { getYardageValue } from '/@/modules/window-module/variable/windowVariable';
  import { handleRestoreState } from '/@/modules/component-module/application-module/method/handleRestoreState';
  import { ApplicationComp } from '/@/modules/component-module/application-module/applicationComp';
  import {
    appProviderProps
  } from "/@/modules/component-module/application-module/variable/applicationProps";
  // 返回用于渲染组件的默认插槽内容
  export default defineComponent({
    // 组件的名称，设置为 'AppProvider'。
    name: 'AppProvider',
    // 表示是否继承父组件的属性，默认为 false。
    inheritAttrs: false,
    props: appProviderProps,
    setup(props, { slots }) {
      const isMobile = ref(false);
      const isSetState = ref(false);
      const isIos = ref(false);

      // 监听屏幕断点信息的变化，并根据断点信息更新相应的变量值
      BlogWindow.createBreakpointListen(({ yardageEnum, width }) => {
        const lgWidth = getYardageValue[unref(yardageEnum.LG)]() || getYardageValue.default();
        lgWidth && (isMobile.value = width.value - 1 < lgWidth);
        isIos.value = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
        handleRestoreState(isSetState);
      });
      const { prefixCls } = toRefs(props);
      ApplicationComp.createAppProviderContext({ prefixCls, isMobile, isIos });
      return () => slots.default?.();
    },
  });
</script>
