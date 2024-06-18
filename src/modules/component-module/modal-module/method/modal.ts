import { computed, onUnmounted, ref, unref } from "vue";
import { ModalMethods } from "/@/modules/component-module/modal-module/interface/ModalMethods";
import { getCurrentInstance, toRaw } from "@vue/runtime-core";
import { isProdMode } from "/@/utils/env/method/isProdMode";
import { error } from "/@/utils/log/method/error";
import { ModalProps } from "/@/modules/component-module/modal-module/interface/ModalProps";
import { isEqual } from "lodash-es";
import {
  dataTransfer, UseModalReturnType,
  visibleData
} from "/@/modules/component-module/modal-module/variable/modalVariable";
import { ReturnMethods } from "/@/modules/component-module/modal-module/interface/ReturnMethods";


export function useModal(): UseModalReturnType {
  const modal = ref<Nullable<ModalMethods>>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<string>('');

  function register(modalMethod: ModalMethods, uuid: string) {
    if (!getCurrentInstance()) {
      throw new Error('useModal() can only be used inside setup() or functional components!');
    }
    uid.value = uuid;
    isProdMode() &&
    onUnmounted(() => {
      modal.value = null;
      loaded.value = false;
      dataTransfer[unref(uid)] = null;
    });
    if (unref(loaded) && isProdMode() && modalMethod === unref(modal)) return;
    modal.value = modalMethod;
    loaded.value = true;
    modalMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(modal);
    if (!instance) {
      error('useModal instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setModalProps: (props: Partial<ModalProps>): void => {
      getInstance()?.setModalProps(props);
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)];
    }),

    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.();
    },

    openModal: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setModalProps({
        visible: visible,
      });

      if (!data) return;
      const id = unref(uid);
      if (openOnSet) {
        dataTransfer[id] = null;
        dataTransfer[id] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
      if (!equal) {
        dataTransfer[id] = toRaw(data);
      }
    },

    closeModal: () => {
      getInstance()?.setModalProps({ visible: false });
    },
  };
  return [register, methods];
}
























// export class Modal {
//   modal: Ref<Nullable<ModalMethods>>;
//   loaded: Ref<Nullable<boolean>>;
//   uid: Ref<string>;
//   getVisible: ComputedRef<boolean>;
//   constructor() {
//     this.modal = ref<Nullable<ModalMethods>>(null);
//     this.loaded = ref<Nullable<boolean>>(false);
//     this.uid = ref<string>('');
//
//     this.getVisible = computed((): boolean => {
//       return visibleData[~~unref(this.uid)];
//     })
//   }
//   register(modalMethod: ModalMethods, uuid: string) {
//     if (!getCurrentInstance()) {
//       throw new Error('useModal() can only be used inside setup() or functional components!');
//     }
//     this.uid.value = uuid;
//     isProdMode() &&
//     onUnmounted(() => {
//       this.modal.value = null;
//       this.loaded.value = false;
//       dataTransfer[unref(this.uid)] = null;
//     });
//     if (unref(this.loaded) && isProdMode() && modalMethod === unref(this.modal)) return;
//     this.modal.value = modalMethod;
//     this.loaded.value = true;
//     modalMethod.emitVisible = (visible: boolean, uid: number) => {
//       visibleData[uid] = visible;
//     };
//   }
//
//   getInstance() {
//     const instance = unref(this.modal);
//     if (!instance) {
//       error('useModal instance is undefined!');
//     }
//     return instance;
//   }
//
//   setModalProps(props: Partial<ModalProps>): void {
//     this.getInstance()?.setModalProps(props);
//   }
//
//   redoModalHeight(): void {
//     this.getInstance()?.redoModalHeight?.();
//   }
//   openModal<T = any>(visible = true, data?: T, openOnSet = true): void {
//     this.getInstance()?.setModalProps({
//       visible: visible,
//     });
//     if (!data) return;
//     const id = unref(this.uid);
//     if (openOnSet) {
//       dataTransfer[id] = null;
//       dataTransfer[id] = toRaw(data);
//       return;
//     }
//     const equal = isEqual(toRaw(dataTransfer[id]), toRaw(data));
//     if (!equal) {
//       dataTransfer[id] = toRaw(data);
//     }
//   }
//
//   closeModal(): void {
//     this.getInstance()?.setModalProps({ visible: false });
//   }
//
//   getMethod() {
//     return [
//       this.register,
//       this.
//     ]
//   }
// }
