import {
  getBaseOptions,
  ModalOptionsPartial
} from "/@/modules/message-module/variable/messageVariable";
import { renderContent } from "/@/modules/message-module/method/renderContent";
import { getIconLabel } from "/@/modules/message-module/method/getIconLabel";

export function createModalOptions(options: ModalOptionsPartial, icon: string): ModalOptionsPartial {
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: getIconLabel(icon),
  };
}
