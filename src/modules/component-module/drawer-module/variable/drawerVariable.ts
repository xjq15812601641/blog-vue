import { reactive } from "vue";
import { DrawerInstance } from "/@/modules/component-module/drawer-module/interface/DrawerInstance";
import { ReturnMethods } from "/@/modules/component-module/drawer-module/interface/ReturnMethods";
import {
  ReturnInnerMethods
} from "/@/modules/component-module/drawer-module/interface/ReturnInnerMethods";
import basicDrawer from "/@/components/Drawer/BasicDrawer.vue";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";


export type RegisterFn = (drawerInstance: DrawerInstance, uuid?: string) => void;
export type UseDrawerReturnType = [RegisterFn, ReturnMethods];

export type UseDrawerInnerReturnType = [RegisterFn, ReturnInnerMethods];
export const dataTransferRef = reactive<any>({});
export const visibleData = reactive<{ [key: number]: boolean }>({});
// export const drawer_footer_prefix = useDesign('basic-drawer-footer');

// export const drawer_header_prefix = useDesign('basic-drawer-header');
// export const basic_drawer_prefix = useDesign('basic-drawer');
export const BasicDrawer = initComponent(basicDrawer);
