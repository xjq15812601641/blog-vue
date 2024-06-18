import {
  componentMap,
  ComponentType
} from "/@/modules/component-module/form-module/variable/formVariable";
import { Component } from "vue";

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component);
}
