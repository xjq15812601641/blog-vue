import { ComputedRef } from "vue";
import { DrawerInstance } from "/@/modules/component-module/drawer-module/interface/DrawerInstance";

export interface ReturnMethods extends DrawerInstance {
  openDrawer: <T = any>(visible?: boolean, data?: T, openOnSet?: boolean) => void;
  closeDrawer: () => void;
  getVisible?: ComputedRef<boolean>;
}
