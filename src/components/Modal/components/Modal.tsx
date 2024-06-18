import { Modal } from 'ant-design-vue';
import { defineComponent, toRefs, unref } from "vue";
import { basicProps } from "/@/modules/component-module/modal-module/variable/modalProps";
import { useModalDragMove } from "/@/modules/component-module/modal-module/method/useModalDragMove";
import { extendSlots } from "/@/utils/BlogUtils";
import { getAttribute } from "/@/modules/blogComp-module/method/getAttribute";


export default defineComponent({
  name: 'Modal',
  inheritAttrs: false,
  props: basicProps,
  emits: ['cancel'],
  setup(props, { slots, emit }) {
    const { visible, draggable, destroyOnClose } = toRefs(props);
    const attrs = getAttribute();
    useModalDragMove({
      visible,
      destroyOnClose,
      draggable,
    });

    const onCancel = (e: Event) => {
      emit('cancel', e);
    };

    return () => {
      const propsData = { ...unref(attrs), ...props, onCancel } as Recordable;
      return <Modal {...propsData}>{extendSlots(slots)}</Modal>;
    };
  },
});
