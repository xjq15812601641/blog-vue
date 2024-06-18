import { TableCustomRecord } from "/@/components/Table/src/types/table";

export interface ExpandedRowRenderRecord<T> extends TableCustomRecord<T> {
  indent?: number;
  expanded?: boolean;
}
