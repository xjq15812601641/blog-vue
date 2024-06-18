import { ColumnChangeParam } from "/@/modules/component-module/table-module/variable/tableVariable";

export interface InnerHandlers {
  onColumnsChange: (data: ColumnChangeParam[]) => void;
}
