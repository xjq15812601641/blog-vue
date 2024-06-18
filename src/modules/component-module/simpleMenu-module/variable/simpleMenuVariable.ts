import { InjectionKey } from "vue";

import {
  SimpleRootMenuContextProps
} from "/@/modules/component-module/simpleMenu-module/interface/SimpleRootMenuContextProps";
import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";
import simpleMenu from "/@/components/SimpleMenu/SimpleMenu.vue";

export const simple_menu_key: InjectionKey<SimpleRootMenuContextProps> = Symbol();
// export const menu_design = useDesign('menu');
// export const simple_menu_design = useDesign('simple-menu');
// export const SimpleMenu = initComponent(simpleMenu);
