import { Component } from "vue";
import { tryOnUnmounted } from "@vueuse/core";
import { ComponentType } from "/@/modules/component-module/form-module/variable/formVariable";
import { FormComp } from "/@/modules/component-module/form-module/formComp";

export function useComponentRegister(compName: ComponentType, comp: Component) {
  FormComp.add(compName, comp);
  tryOnUnmounted(() => {
    FormComp.del(compName);
  });
}
