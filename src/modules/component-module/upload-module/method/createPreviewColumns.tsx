
// 文件预览列表
import ThumbUrl from "/@/components/Upload/ThumbUrl.vue";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import {
  PreviewFileItem
} from "/@/modules/component-module/upload-module/interface/PreviewFileItem";
import { isImgTypeByName } from "/@/modules/component-module/upload-module/method/isImgTypeByName";

export function createPreviewColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'url',
      title: '缩略图',
      width: 100,
      customRender: ({ record }) => {
        const { url } = (record as PreviewFileItem) || {};
        return isImgTypeByName(url) && <ThumbUrl fileUrl={url} />;
      },
    },
    {
      dataIndex: 'name',
      title: '文件名',
      align: 'left',
    },
  ];
}
