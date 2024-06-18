import basicArrow from '/@/components/Basic/BasicArrow.vue';
import basicHelp from '/@/components/Basic/BasicHelp.vue';
import basicTitle from '/@/components/Basic/BasicTitle.vue';
import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";

export const BasicArrow = initComponent(basicArrow);
export const BasicHelp = initComponent(basicHelp);
export const BasicTitle = initComponent(basicTitle);
// export const prefix_arrow = useDesign('basic-arrow');
// export const prefix_help = useDesign('basic-help');
// export const prefix_title = useDesign('basic-title');
