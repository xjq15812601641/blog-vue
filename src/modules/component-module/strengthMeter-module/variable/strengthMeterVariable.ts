import strengthMeter from "/@/components/StrengthMeter/StrengthMeter.vue";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";
import { useDesign } from "/@/modules/blogComp-module/method/useDesign";

export const strength_meter_design = useDesign('strength-meter');
export const  strength_meter_array = ['score-change', 'change']
export const StrengthMeter = initComponent(strengthMeter);
