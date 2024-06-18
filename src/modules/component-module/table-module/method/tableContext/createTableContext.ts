import { provide } from "vue";
import { Instance, key } from "/@/modules/component-module/table-module/variable/tableProps";

export function createTableContext(instance: Instance) {
  provide(key, instance);
}
