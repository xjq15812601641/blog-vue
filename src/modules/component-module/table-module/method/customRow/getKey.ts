import { ROW_KEY } from "/@/components/Table/src/const";
import { isFunction, isString } from "/@/utils/is/is";
export function getKey(
  record: Recordable,
  rowKey: string | ((record: Record<string, any>) => string) | undefined,
  autoCreateKey?: boolean,
) {
  if (!rowKey || autoCreateKey) {
    return record[ROW_KEY];
  }
  if (isString(rowKey)) {
    return record[rowKey];
  }
  if (isFunction(rowKey)) {
    return record[rowKey(record)];
  }
  return null;
}
