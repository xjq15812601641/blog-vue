import { modal_context_key } from "/@/modules/component-module/table-module/variable/tableVariable";
import {
  ModalContextProps
} from "/@/modules/component-module/table-module/interface/modalContext/ModalContextProps";
import { BlogComponent } from "/@/modules/blogComp-module/BlogComponent";

export function useModalContext() {
  return BlogComponent.useContext<ModalContextProps>(modal_context_key);
}
