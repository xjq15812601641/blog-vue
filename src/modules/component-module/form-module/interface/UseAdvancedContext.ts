import { ComputedRef, Ref } from "vue";
import { FormProps } from "/@/modules/component-module/form-module/interface/FormProps";
import { FormSchema } from "/@/modules/component-module/form-module/interface/FormSchema";
import { AdvanceState } from "/@/modules/component-module/form-module/interface/AdvanceState";

export interface UseAdvancedContext {
  advanceState: AdvanceState;
  emit: EmitType;
  getProps: ComputedRef<FormProps>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  defaultValueRef: Ref<Recordable>;
}
