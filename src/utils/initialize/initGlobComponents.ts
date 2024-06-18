import type { App } from 'vue';
import { Input, Layout } from 'ant-design-vue';
import { BasicButton } from "/@/modules/component-module/button-module/variable/buttonVariable";
import { TableComp } from "/@/modules/component-module/table-module/tableComp";
export function initGlobComponents(app: App) {
  app.use(Input).use(Layout).use(BasicButton);
  TableComp.initButtonMap();
}
