export function removeEventListener(isAddRef, e: Element, name, realHandler, options) {
  isAddRef.value = true;
  e.removeEventListener(name, realHandler, options);
}
