import { ComputedRef } from "vue";

export interface Options {
  setSelectedRowKeys: (keys: string[]) => void;
  getSelectRowKeys: () => string[];
  clearSelectedRowKeys: () => void;
  emit: EmitType;
  getAutoCreateKey: ComputedRef<boolean | undefined>;
}
