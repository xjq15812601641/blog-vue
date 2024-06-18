import { ModalProps } from "/@/modules/component-module/modal-module/interface/ModalProps";

export interface ModalMethods {
  setModalProps: (props: Partial<ModalProps>) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
  redoModalHeight?: () => void;
}
