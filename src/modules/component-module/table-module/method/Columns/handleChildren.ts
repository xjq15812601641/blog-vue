import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import { handleItem } from "/@/modules/component-module/table-module/method/Columns/handleItem";

export function handleChildren(children: BasicColumn[] | undefined, ellipsis: boolean) {
  if (!children) return;
  children.forEach((item) => {
    const { children } = item;
    handleItem(item, ellipsis);
    handleChildren(children, ellipsis);
  });
}
