import {
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Switch,
  TimePicker
} from "ant-design-vue";
import { Component } from "vue";
import {
  componentMap,
  ComponentType
} from "/@/modules/component-module/table-module/variable/tableVariable";
import ApiTreeSelect from "/@/components/Form/components/ApiTreeSelect.vue";
import ApiSelect from "/@/components/Form/components/ApiSelect.vue";

export class TableComp {
  static initButtonMap() {
    componentMap.set('Input', Input);
    componentMap.set('InputNumber', InputNumber);
    componentMap.set('Select', Select);
    componentMap.set('ApiSelect', ApiSelect);
    componentMap.set('ApiTreeSelect', ApiTreeSelect);
    componentMap.set('Switch', Switch);
    componentMap.set('Checkbox', Checkbox);
    componentMap.set('DatePicker', DatePicker);
    componentMap.set('TimePicker', TimePicker);
  }
  static add(compName: ComponentType, component: Component) {
    componentMap.set(compName, component);
  }
  static del(compName: ComponentType) {
    componentMap.delete(compName);
  }
}
