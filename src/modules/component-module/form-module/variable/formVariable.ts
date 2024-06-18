import { genType } from "/@/modules/component-module/form-module/method/genType";
import { DateUtil } from "/@/utils/dateUtil/dateUtil";
import { Component, InjectionKey } from "vue";
import { FormActionType } from "/@/modules/component-module/form-module/interface/FormActionType";
import { NamePath, RuleObject } from "ant-design-vue/lib/form/interface";
import { DynamicProps } from "/#/utils";
import { FormProps } from "/@/modules/component-module/form-module/interface/FormProps";
import {
  FormContextProps
} from "/@/modules/component-module/form-module/interface/FormContextProps";
import { useDesign } from "/@/modules/blogComp-module/method/useDesign";


/**
 * 时间字段
 */
export const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];
export const dateItemType = genType();

export const defaultValueComponents = ['Input', 'InputPassword', 'InputSearch', 'InputTextArea'];
export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
export type FieldMapToTime = [string, [string, string], string?][];
export type ColSpanType = number | string;

export type Rule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};
export const BASIC_COL_LEN = 24;

export declare type ValidateFields = (nameList?: NamePath[]) => Promise<Recordable>;

export type Props = Partial<DynamicProps<FormProps>>;
export const form_key: InjectionKey<FormContextProps> = Symbol();

export const dateForm = new DateUtil();

export const basic_form_prefix= useDesign('basic-form');
export const componentMap = new Map<ComponentType, Component>();

export type ComponentType =
  | 'Input'
  | 'InputGroup'
  | 'InputPassword'
  | 'InputSearch'
  | 'InputTextArea'
  | 'InputNumber'
  | 'InputCountDown'
  | 'Select'
  | 'ApiSelect'
  | 'TreeSelect'
  | 'ApiTreeSelect'
  | 'ApiRadioGroup'
  | 'RadioButtonGroup'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'AutoComplete'
  | 'ApiCascader'
  | 'Cascader'
  | 'DatePicker'
  | 'MonthPicker'
  | 'RangePicker'
  | 'WeekPicker'
  | 'TimePicker'
  | 'Switch'
  | 'StrengthMeter'
  | 'Upload'
  | 'IconPicker'
  | 'Render'
  | 'Slider'
  | 'Rate'
  | 'Divider';
