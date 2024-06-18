
import { modal_key } from "/@/modules/component-module/modal-module/variable/modalVariable";
import { createContext } from "/@/modules/blogComp-module/method/createContext";
import {
  ModalContextProps
} from "/@/modules/component-module/modal-module/interface/ModalContextProps";
import { useContext } from "/@/modules/blogComp-module/method/useContext";

export class ModalComp {
  static createModalContext(context: ModalContextProps) {
    return createContext<ModalContextProps>(context, modal_key);
  }
  static useModalContext() {
    return useContext<ModalContextProps>(modal_key);
  }
}
