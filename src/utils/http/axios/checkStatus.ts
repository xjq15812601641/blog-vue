import type { ErrorMessageMode } from '/#/axios';
import { BlogMessage } from "/@/modules/message-module/blogMessage";
import { defaultSetting } from "/@/modules/blogComp-module/variable/BlogComponentVariable";
import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
import { SessionTimeoutProcessingEnum } from "/@/enums/sessionTimeoutProcessingEnum";

const { createMessage, createDesignateModal } = BlogMessage.useMessage();
// const error = createMessage.error!;
const stp = defaultSetting.sessionTimeoutProcessing;

export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message',): void {/*   默认为 'message'    */
  const userStore = BlogUserStore;/*      获取状态管理库对象     */
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      userStore.setToken(undefined);/*      清空token     */
      errMessage = msg || '请求出错';
      // debugger;
      if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
        userStore.setSessionTimeout(true);
      } else {
        userStore.logout();
      }
      break;
    default:
      errMessage = `接口出错了，请稍后再试`;
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {   createDesignateModal('close',{ title: '错误提示', content: errMessage }   );}
    else if (errorMessageMode === 'message') {    createMessage.error(errMessage);    }
  }
}
