import { FormSchema } from "/@/modules/component-module/form-module/interface/FormSchema";

export interface RenderCallbackParams {
  schema: FormSchema;
  values: Recordable;
  model: Recordable;
  field: string;
}
