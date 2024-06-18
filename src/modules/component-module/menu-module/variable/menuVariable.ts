import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";
import basicMenu from "/@/components/Menu/BasicMenu.vue";

// export const basic_menu_design = useDesign('basic-menu');
// export const basic_menu_item_design = useDesign('basic-menu-item');
// export const basic_menu_item_content = useDesign('basic-menu-item-content');
export const BasicMenu = initComponent(basicMenu);
