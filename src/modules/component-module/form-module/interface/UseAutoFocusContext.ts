import { ComputedRef, Ref } from "vue";
import { FormActionType } from "/@/modules/component-module/form-module/interface/FormActionType";
import { FormProps } from "/@/modules/component-module/form-module/interface/FormProps";
import { FormSchema } from "/@/modules/component-module/form-module/interface/FormSchema";

export interface UseAutoFocusContext {
  getSchema: ComputedRef<FormSchema[]>;
  getProps: ComputedRef<FormProps>;
  isInitedDefault: Ref<boolean>;
  formElRef: Ref<FormActionType>;
}
