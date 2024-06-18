import { isString } from "/@/utils/is/is";
import { ModalOptionsEx } from "/@/modules/message-module/interface/modalOptionsEx";

export function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    return <div innerHTML={`<div>${content as string}</div>`}></div>;
  } else {
    return content;
  }
}
