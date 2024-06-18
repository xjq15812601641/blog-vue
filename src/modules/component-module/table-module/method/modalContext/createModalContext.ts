import {
  ModalContextProps
} from "/@/modules/component-module/table-module/interface/modalContext/ModalContextProps";
import {
  modal_context_key,
} from "/@/modules/component-module/table-module/variable/tableVariable";
import { BlogComponent } from "/@/modules/blogComp-module/BlogComponent";

export function createModalContext(context: ModalContextProps) {
  return BlogComponent.createContext<ModalContextProps>(context, modal_context_key);
}
