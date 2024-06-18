import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
import {
  ItemRender
} from "/@/modules/component-module/table-module/interface/pagination/ItemRender";

export function itemRender({ page, type, originalElement }: ItemRender) {
  if (type === 'prev') {
    return page === 0 ? null : <LeftOutlined />;
  } else if (type === 'next') {
    return page === 1 ? null : <RightOutlined />;
  }
  return originalElement;
}
