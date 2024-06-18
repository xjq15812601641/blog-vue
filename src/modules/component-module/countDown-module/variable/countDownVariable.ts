import countdownInput from"/@/components/CountDown/CountdownInput.vue";
import countButton from "/@/components/CountDown/CountButton.vue";
import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";
export const input_prefix = useDesign('countdown-input');
export const CountdownInput = initComponent(countdownInput);
export const CountButton = initComponent(countButton);
