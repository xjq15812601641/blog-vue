import { ComputedRef, Ref } from "vue";
import { FormProps } from "/@/modules/component-module/form-module/interface/FormProps";
import { FormSchema } from "/@/modules/component-module/form-module/interface/FormSchema";
import { FormActionType } from "/@/modules/component-module/form-module/interface/FormActionType";

export interface UseFormActionContext {
  emit: EmitType;
  getProps: ComputedRef<FormProps>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  defaultValueRef: Ref<Recordable>;
  formElRef: Ref<FormActionType>;
  schemaRef: Ref<FormSchema[]>;
  handleFormValues: Fn;
}
