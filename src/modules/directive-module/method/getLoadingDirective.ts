import { Directive } from "@vue/runtime-core";
import { createLoading } from "/@/modules/directive-module/method/createLoading";

export const loadingDirective: Directive = {
  mounted(el, binding) {
    const tip = el.getAttribute('loading-tip');
    const background = el.getAttribute('loading-background');
    const size = el.getAttribute('loading-size');
    const fullscreen = !!binding.modifiers.fullscreen;
    const instance = createLoading(
      {
        tip,
        background,
        size: size || 'large',
        loading: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el,
    );
    el.instance = instance;
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};
