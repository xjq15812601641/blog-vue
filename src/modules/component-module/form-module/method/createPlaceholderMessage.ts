import { ComponentType } from "/@/components/Form/src/types";

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input') || component.includes('Complete')) {
    return '请输入';
  }
  if (component.includes('Picker')) {
    return '请选择';
  }
  if (
    component.includes('Select') ||
    component.includes('Cascader') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch')
  ) {
    return '请选择';
  }
  return '';
}
