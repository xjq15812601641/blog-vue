import {
  AutoComplete, Cascader, Checkbox, DatePicker, Divider,
  Input,
  InputNumber,
  Radio, Rate,
  Select, Slider,
  Switch, TimePicker,
  TreeSelect
} from "ant-design-vue";
import ApiSelect from "/@/components/Form/components/ApiSelect.vue";
import ApiTreeSelect from "/@/components/Form/components/ApiTreeSelect.vue";
import ApiRadioGroup from "/@/components/Form/components/ApiRadioGroup.vue";
import RadioButtonGroup from "/@/components/Form/components/RadioButtonGroup.vue";
import ApiCascader from "/@/components/Form/components/ApiCascader.vue";
import {
  StrengthMeter
} from "/@/modules/component-module/strengthMeter-module/variable/strengthMeterVariable";
import { IconPicker } from "/@/modules/component-module/icon-module/variable/iconVariable";
import {
  CountdownInput
} from "/@/modules/component-module/countDown-module/variable/countDownVariable";
import {
  componentMap,
  ComponentType
} from "/@/modules/component-module/form-module/variable/formVariable";
import BasicUpload from "/@/components/Upload/BasicUpload.vue";
import { Component } from "vue";

export class FormComp {
  static initComponentMap() {
    componentMap.set('Input', Input);
    componentMap.set('InputGroup', Input.Group);
    componentMap.set('InputPassword', Input.Password);
    componentMap.set('InputSearch', Input.Search);
    componentMap.set('InputTextArea', Input.TextArea);
    componentMap.set('InputNumber', InputNumber);
    componentMap.set('AutoComplete', AutoComplete);

    componentMap.set('Select', Select);
    componentMap.set('ApiSelect', ApiSelect);
    componentMap.set('TreeSelect', TreeSelect);
    componentMap.set('ApiTreeSelect', ApiTreeSelect);
    componentMap.set('ApiRadioGroup', ApiRadioGroup);
    componentMap.set('Switch', Switch);
    componentMap.set('RadioButtonGroup', RadioButtonGroup);
    componentMap.set('RadioGroup', Radio.Group);
    componentMap.set('Checkbox', Checkbox);
    componentMap.set('CheckboxGroup', Checkbox.Group);
    componentMap.set('ApiCascader', ApiCascader);
    componentMap.set('Cascader', Cascader);
    componentMap.set('Slider', Slider);
    componentMap.set('Rate', Rate);

    componentMap.set('DatePicker', DatePicker);
    componentMap.set('MonthPicker', DatePicker.MonthPicker);
    componentMap.set('RangePicker', DatePicker.RangePicker);
    componentMap.set('WeekPicker', DatePicker.WeekPicker);
    componentMap.set('TimePicker', TimePicker);
    componentMap.set('StrengthMeter', StrengthMeter);
    componentMap.set('IconPicker', IconPicker);
    componentMap.set('InputCountDown', CountdownInput);

    componentMap.set('Upload', BasicUpload);
    componentMap.set('Divider', Divider);
  }
  static add(compName: ComponentType, component: Component) {
    componentMap.set(compName, component);
  }

  static del(compName: ComponentType) {
    componentMap.delete(compName);
  }
}
