import { DrawerProps } from "/@/modules/component-module/drawer-module/interface/DrawerProps";

export interface DrawerInstance {
  setDrawerProps: (props: Partial<DrawerProps> | boolean) => void;
  emitVisible?: (visible: boolean, uid: number) => void;
}
