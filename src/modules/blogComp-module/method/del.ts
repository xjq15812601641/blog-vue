import {
  componentMap,
  ComponentType
} from "/@/modules/component-module/form-module/variable/formVariable";

export function del(compName: ComponentType) {
  componentMap.delete(compName);
}
