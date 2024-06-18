import {
  defineComponent,
  Ref,
  getCurrentInstance,
  inject,
  h, onUnmounted
} from "vue";
import { BarProp } from "/@/modules/component-module/scrollbar-module/variable/scrollbarProps";
import { off } from "/@/utils/dom/method/off";
import { renderThumbStyle } from "/@/modules/component-module/scrollbar-module/method/renderThumbStyle";
import { useBar } from "/@/modules/component-module/scrollbar-module/method/useBar";

export default defineComponent({
  name: 'Bar',
  props: BarProp,
  setup(props) {
    const instance = getCurrentInstance();
    const wrap = inject('scroll-bar-wrap', {} as Ref<Nullable<HTMLElement>>) as any;
    const { thumb, bar, clickThumbHandler, clickTrackHandler, mouseUpDocumentHandler } = useBar(props, instance, wrap);
    onUnmounted(() => {
      off(document, 'mouseup', mouseUpDocumentHandler);
    });
    return () =>
      h(
        'div',
        {
          class: ['scrollbar__bar', 'is-' + bar.value.key],
          onMousedown: clickTrackHandler,
        },
        h('div', {
          ref: thumb,
          class: 'scrollbar__thumb',
          onMousedown: clickThumbHandler,
          style: renderThumbStyle({
            size: props.size,
            move: props.move,
            bar: bar.value,
          }),
        }),
      );
  },
});
