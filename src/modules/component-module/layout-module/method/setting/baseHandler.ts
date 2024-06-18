import { HandlerEnum } from "/@/enums/HandlerEnum";
import { BlogConfigStore } from "/@/modules/store-module/variable/storeVariable";
import { handler } from "/@/modules/component-module/layout-module/method/setting/handler";

export function baseHandler(event: HandlerEnum, value: any) {
  const config = handler(event, value);
  BlogConfigStore.setProjectConfig(config);
}
