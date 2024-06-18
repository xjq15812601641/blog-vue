import { ObjectDirective } from "@vue/runtime-core";
import { createDocumentHandler } from "/@/modules/directive-module/method/createDocumentHandler";
import { FlushList } from "/@/modules/directive-module/variable/directiveVariable";
const nodeList: FlushList = new Map();
export const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    });
  },
  updated(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value,
    });
  },
  unmounted(el) {
    nodeList.delete(el);
  },
};
