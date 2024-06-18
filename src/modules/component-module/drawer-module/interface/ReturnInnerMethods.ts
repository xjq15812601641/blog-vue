import { ComputedRef } from "vue";
import { DrawerInstance } from "/@/modules/component-module/drawer-module/interface/DrawerInstance";

export interface ReturnInnerMethods extends DrawerInstance {
  closeDrawer: () => void;
  changeLoading: (loading: boolean) => void;
  changeOkLoading: (loading: boolean) => void;
  getVisible?: ComputedRef<boolean>;
}
