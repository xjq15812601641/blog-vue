import { Modal } from "ant-design-vue";
import { createModalOptions } from "/@/modules/message-module/method/createModalOptions";
import { ModalOptionsPartial } from "/@/modules/message-module/variable/messageVariable";

export function createDesignateModal(designate: string, options: ModalOptionsPartial) {
  const designateModal = {
    'error': Modal.error(createModalOptions(options, 'close')),
    'success': Modal.success(createModalOptions(options, 'success')),
    'info': Modal.info(createModalOptions(options, 'info')),
    'warning': Modal.warning(createModalOptions(options, 'warning')),
    'default': Modal.error(createModalOptions(options, 'close')),
  }

  return designateModal[designate] || designateModal['default'];
}
