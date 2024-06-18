import { DEFAULT_ALIGN } from "/@/components/Table/src/const";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import { isBoolean } from "/@/utils/is/is";
import {
  handleChildren
} from "/@/modules/component-module/table-module/method/Columns/handleChildren";

export function handleItem(item: BasicColumn, ellipsis: boolean) {
  const { key, dataIndex, children } = item;
  item.align = item.align || DEFAULT_ALIGN;
  if (ellipsis) {
    if (!key && !dataIndex) {
      item.key = dataIndex;
    }
    if (!isBoolean(item.ellipsis)) {
      Object.assign(item, {
        ellipsis,
      });
    }
  }
  if (children && children.length) {
    handleChildren(children, !!ellipsis);
  }
}
