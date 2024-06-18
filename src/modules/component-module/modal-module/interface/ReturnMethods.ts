import { ModalMethods } from "/@/modules/component-module/modal-module/interface/ModalMethods";
import { ComputedRef } from "vue";

export interface ReturnMethods extends ModalMethods {
  openModal: <T = any>(props?: boolean, data?: T, openOnSet?: boolean) => void;
  closeModal: () => void;
  getVisible?: ComputedRef<boolean>;
}
