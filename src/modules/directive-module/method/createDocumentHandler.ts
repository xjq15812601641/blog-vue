import type { ComponentPublicInstance, DirectiveBinding } from 'vue';
import { DocumentHandler } from "/@/modules/directive-module/variable/directiveVariable";
export function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding): DocumentHandler {
  let excludes: HTMLElement[] = [];
  if (Array.isArray(binding.arg)) {
    excludes = binding.arg;
  } else {
    // due to current implementation on binding type is wrong the type casting is necessary here
    excludes.push(binding.arg as unknown as HTMLElement);
  }
  return function (mouseup, mousedown) {
    const popperRef = (
      binding.instance as ComponentPublicInstance<{
        popperRef: Nullable<HTMLElement>;
      }>
    ).popperRef;
    const mouseUpTarget = mouseup.target as Node;
    const mouseDownTarget = mousedown.target as Node;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;

    const isTargetExcluded =
      (excludes.length && excludes.some((item) => item?.contains(mouseUpTarget))) ||
      (excludes.length && excludes.includes(mouseDownTarget as HTMLElement));
    const isContainedByPopper =
      popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
    if (
      isBound ||
      isTargetExists ||
      isContainedByEl ||
      isSelf ||
      isTargetExcluded ||
      isContainedByPopper
    ) {
      return;
    }
    binding.value();
  };
}
