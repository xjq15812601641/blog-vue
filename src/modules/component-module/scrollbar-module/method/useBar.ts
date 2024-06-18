import { computed, ref } from "vue";
import { BAR_MAP } from "/@/modules/component-module/scrollbar-module/variable/scrollbarVariable";
import { on } from "/@/utils/dom/method/on";
import { off } from "/@/utils/dom/method/off";

export function useBar(props, instance, wrap) {
  const thumb = ref();
  const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal']);
  const barStore = ref<Recordable>({});
  const cursorDown = ref();
  const clickThumbHandler = (e: any) => {
    if (e.ctrlKey || e.button === 2) {
      return; // 如果按下了 Ctrl 键或者是鼠标右键点击，则直接返回，不执行后续操作
    }
    window.getSelection()?.removeAllRanges(); // 清除当前文本的选中状态
    startDrag(e);
    barStore.value[bar.value.axis] =
      e.currentTarget[bar.value.offset] -
      (e[bar.value.client] - e.currentTarget.getBoundingClientRect()[bar.value.direction]);
  };
  const clickTrackHandler = (e: any) => {
    const offset = Math.abs(
      e.target.getBoundingClientRect()[bar.value.direction] - e[bar.value.client],
    );
    const thumbHalf = thumb.value[bar.value.offset] / 2;
    const thumbPositionPercentage =
      ((offset - thumbHalf) * 100) / instance?.vnode.el?.[bar.value.offset];

    wrap.value[bar.value.scroll] =
      (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100;
  };
  const startDrag = (e: any) => {
    e.stopImmediatePropagation();
    cursorDown.value = true;
    on(document, 'mousemove', mouseMoveDocumentHandler);
    on(document, 'mouseup', mouseUpDocumentHandler);
    document.onselectstart = () => false;
  };
  const mouseMoveDocumentHandler = (e: any) => {
    if (cursorDown.value === false) return;
    const prevPage = barStore.value[bar.value.axis];

    if (!prevPage) return;

    const offset =
      (instance?.vnode.el?.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) *
      -1;
    const thumbClickPosition = thumb.value[bar.value.offset] - prevPage;
    const thumbPositionPercentage =
      ((offset - thumbClickPosition) * 100) / instance?.vnode.el?.[bar.value.offset];
    wrap.value[bar.value.scroll] =
      (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100;
  };
  function mouseUpDocumentHandler() {
    cursorDown.value = false;
    barStore.value[bar.value.axis] = 0;
    off(document, 'mousemove', mouseMoveDocumentHandler);
    document.onselectstart = null;
  }


  return {
    thumb,
    bar,
    clickThumbHandler,
    clickTrackHandler,
    mouseUpDocumentHandler,
  };
}
