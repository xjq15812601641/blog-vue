import { PropType } from "vue";
import { Mode } from "/@/modules/component-module/transition-module/variable/transitionVariable";

export const CreateJSTransitionProp = {
  mode: {
    type: String as PropType<Mode>,
    default: 'in-out',
  },
}
