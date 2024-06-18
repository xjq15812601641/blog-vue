import { ComponentType } from "/@/modules/component-module/table-module/variable/tableVariable";

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component.includes('Input')) {
    return '请输入';
  }
  if (component.includes('Picker')) {
    return '请选择';
  }

  if (
    component.includes('Select') ||
    component.includes('Checkbox') ||
    component.includes('Radio') ||
    component.includes('Switch') ||
    component.includes('DatePicker') ||
    component.includes('TimePicker')
  ) {
    return '请选择';
  }
  return '';
}
