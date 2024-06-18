import { Directive, DirectiveBinding } from '@vue/runtime-core';

// @ts-ignore
function isAuth(el: Element, binding: any) {
  const value = binding.value;
  if (!value) return;
}
const mounted = (el: Element, binding: DirectiveBinding<any>) => {
  isAuth(el, binding);
};

export const authDirective: Directive = {
  mounted,
};
