import { message, notification } from "ant-design-vue";
import { createConfirm } from "/@/modules/message-module/method/createConfirm";
import { createDesignateModal } from "/@/modules/message-module/method/createDesignateModal";

export class BlogMessage {
  static useMessage() {
    return {
      createMessage: message,
      notification: notification,
      createConfirm: createConfirm,
      createDesignateModal,
    };
  }
}
