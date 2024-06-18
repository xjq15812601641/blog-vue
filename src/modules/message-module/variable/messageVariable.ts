import { ModalOptionsEx } from "/@/modules/message-module/interface/modalOptionsEx";

export type ModalOptionsPartial = Partial<ModalOptionsEx> & Pick<ModalOptionsEx, 'content'>;
export const getBaseOptions = () => {
  return {
    okText: '确认',
    centered: true,
  };
};
