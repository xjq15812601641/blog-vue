import { ModalMethods } from "/@/modules/component-module/modal-module/interface/ModalMethods";
import { computed, nextTick, ref, unref, watchEffect } from "vue";
import { getCurrentInstance } from "@vue/runtime-core";
import { error } from "/@/utils/log/method/error";
import { isProdMode } from "/@/utils/env/method/isProdMode";
import { tryOnUnmounted } from "@vueuse/shared";
import { isFunction } from "/@/utils/is/is";
import { ModalProps } from "/@/modules/component-module/modal-module/interface/ModalProps";
import { dataTransfer, UseModalInnerReturnType, visibleData } from "/@/modules/component-module/modal-module/variable/modalVariable";

export const useModalInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<ModalMethods>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    if (!instance) {
      error('useModalInner instance is undefined!');
    }
    return instance;
  };

  const register = (modalInstance: ModalMethods, uuid: string) => {
    isProdMode() &&
    tryOnUnmounted(() => {
      modalInstanceRef.value = null;
    });
    uidRef.value = uuid;
    modalInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading });
      },
      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)];
      }),

      changeOkLoading: (loading = true) => {
        getInstance()?.setModalProps({ confirmLoading: loading });
      },

      closeModal: () => {
        getInstance()?.setModalProps({ visible: false });
      },

      setModalProps: (props: Partial<ModalProps>) => {
        getInstance()?.setModalProps(props);
      },

      redoModalHeight: () => {
        const callRedo = getInstance()?.redoModalHeight;
        callRedo && callRedo();
      },
    },
  ];
};
