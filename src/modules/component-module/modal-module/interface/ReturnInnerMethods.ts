import { ComputedRef } from "vue";
import { ModalMethods } from "/@/modules/component-module/modal-module/interface/ModalMethods";

export interface ReturnInnerMethods extends ModalMethods {
  closeModal: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getVisible?: ComputedRef<boolean>;
  redoModalHeight: () => void;
}
