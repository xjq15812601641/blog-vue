import { ModalMethods } from "/@/modules/component-module/modal-module/interface/ModalMethods";
import { computed, ComputedRef, nextTick, ref, Ref, unref, watchEffect } from "vue";
import { getCurrentInstance } from "@vue/runtime-core";
import { error } from "/@/utils/log/method/error";
import { isProdMode } from "/@/utils/env/method/isProdMode";
import { tryOnUnmounted } from "@vueuse/shared";
import { isFunction } from "/@/utils/is/is";
import { ModalProps } from "/@/modules/component-module/modal-module/interface/ModalProps";
import {
  dataTransfer,
  visibleData
} from "/@/modules/component-module/modal-module/variable/modalVariable";

export class ModalInner {
  modalInstanceRef: Ref<Nullable<ModalMethods>>;
  currentInstance: any;
  uidRef: Ref<string>;
  getVisible: ComputedRef<boolean>;

  constructor(callbackFn?: Fn) {
    this.modalInstanceRef = ref<Nullable<ModalMethods>>(null);
    this.currentInstance = getCurrentInstance();
    this.uidRef = ref<string>('');
    this.getVisible = computed((): boolean => {
      return visibleData[~~unref(this.uidRef)];
    });
    watchEffect(() => {
      const data = dataTransfer[unref(this.uidRef)];
      if (!data) return;
      if (!callbackFn || !isFunction(callbackFn)) return;
      nextTick(() => {
        callbackFn(data);
      });
    });

  }
  getInstance() {
    const instance = unref(this.modalInstanceRef);
    if (!instance) {
      error('useModalInner instance is undefined!');
    }
    return instance;
  };

  register(modalInstance: ModalMethods, uuid: string) {
    isProdMode() &&
    tryOnUnmounted(() => {
      this.modalInstanceRef.value = null;
    });
    this.uidRef.value = uuid;
    this.modalInstanceRef.value = modalInstance;
    this.currentInstance?.emit('register', modalInstance, uuid);
  };

  changeLoading(loading = true) {
    this.getInstance()?.setModalProps({ loading });
  }

  changeOkLoading(loading = true) {
    this.getInstance()?.setModalProps({ confirmLoading: loading });
  }
  redoModalHeight() {
    const callRedo = this.getInstance()?.redoModalHeight;
    callRedo && callRedo();
  }
  closeModal() {
    this.getInstance()?.setModalProps({ visible: false });
  }
  setModalProps(props: Partial<ModalProps>) {
    this.getInstance()?.setModalProps(props);
  }
}
