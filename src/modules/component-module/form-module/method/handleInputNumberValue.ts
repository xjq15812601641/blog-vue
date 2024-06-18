import { ComponentType } from "/@/components/Form/src/types";
import { isNumber } from "/@/utils/is/is";

export function handleInputNumberValue(component?: ComponentType, val?: any) {
  if (!component) return val;
  if (['Input', 'InputPassword', 'InputSearch', 'InputTextArea'].includes(component)) {
    return val && isNumber(val) ? `${val}` : val;
  }
  return val;
}
