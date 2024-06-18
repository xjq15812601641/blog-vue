import { ComputedRef, Ref } from "vue";
import { FormSchema } from "/@/modules/component-module/form-module/interface/FormSchema";
import { FormProps } from "/@/modules/component-module/form-module/interface/FormProps";

export interface UseFormValuesContext {
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  getProps: ComputedRef<FormProps>;
  formModel: Recordable;
}
