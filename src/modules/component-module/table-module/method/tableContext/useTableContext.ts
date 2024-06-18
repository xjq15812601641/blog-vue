import { inject } from "vue";
import { key, RetInstance } from "/@/modules/component-module/table-module/variable/tableProps";

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance;
}
