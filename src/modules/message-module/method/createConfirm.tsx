import { ModalOptionsEx } from "/@/modules/message-module/interface/modalOptionsEx";
import { ConfirmOptions } from "/@/modules/message-module/interface/confirmOptions";
import { Modal, ModalFuncProps } from "ant-design-vue";
import { getIconLabel } from "/@/modules/message-module/method/getIconLabel";
import { renderContent } from "/@/modules/message-module/method/renderContent";


export function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  Reflect.deleteProperty(options, 'iconType');
  const opt: ModalFuncProps = {
    centered: true,
    icon: getIconLabel(options.iconType || 'warning'),
    ...options,
    content: renderContent(options),
  };
  return Modal.confirm(opt) as unknown as ConfirmOptions;
}
