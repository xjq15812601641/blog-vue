import { defineComponent, Transition } from 'vue';
import { CreateJSTransitionProp } from "/@/modules/component-module/transition-module/variable/transitionProps";
import { getSlot } from "/@/utils/BlogUtils";
export function createJavascriptTransition(
  name: string,
  functions: Recordable,
) {
  return defineComponent({
    name,
    props: CreateJSTransitionProp,
    setup(props, { attrs, slots }) {
      return () => {
        return (
          <Transition
            name={name}
            mode={props.mode}
            {...attrs}
            onBeforeEnter={functions.beforeEnter}
            onEnter={functions.enter}
            onLeave={functions.leave}
            onAfterLeave={functions.afterLeave}
            onLeaveCancelled={functions.afterLeave}
          >
            {() => getSlot(slots)}
          </Transition>
        );
      };
    },
  });
}
