import ThumbUrl from "/@/components/Upload/ThumbUrl.vue";
import { Progress, Tag } from "ant-design-vue";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import { FileItem } from "/@/modules/component-module/upload-module/interface/FileItem";
import { UploadResultStatus } from "/@/enums/uploadResultStatus";

export function createTableColumns(): BasicColumn[] {
  return [
    {
      dataIndex: 'thumbUrl',
      title: '缩略图',
      width: 100,
      customRender: ({ record }) => {
        const { thumbUrl } = (record as FileItem) || {};
        return thumbUrl && <ThumbUrl fileUrl={thumbUrl} />;
      },
    },
    {
      dataIndex: 'name',
      title: '文件名',
      align: 'left',
      customRender: ({ text, record }) => {
        const { percent, status: uploadStatus } = (record as FileItem) || {};
        let status: 'normal' | 'exception' | 'active' | 'success' = 'normal';
        if (uploadStatus === UploadResultStatus.ERROR) {
          status = 'exception';
        } else if (uploadStatus === UploadResultStatus.UPLOADING) {
          status = 'active';
        } else if (uploadStatus === UploadResultStatus.SUCCESS) {
          status = 'success';
        }
        return (
          <span>
            <p class="truncate mb-1" title={text}>
          {text}
          </p>
          <Progress percent={percent} size="small" status={status} />
        </span>
      );
      },
    },
    {
      dataIndex: 'size',
      title: '文件大小',
      width: 100,
      customRender: ({ text = 0 }) => {
        return text && (text / 1024).toFixed(2) + 'KB';
      },
    },
    // {
    //   dataIndex: 'type',
    //   title: '文件类型',
    //   width: 100,
    // },
    {
      dataIndex: 'status',
      title: '状态',
      width: 100,
      customRender: ({ text }) => {
        if (text === UploadResultStatus.SUCCESS) {
          return <Tag color="green">{() => '上传成功'}</Tag>;
        } else if (text === UploadResultStatus.ERROR) {
          return <Tag color="red">{() => '上传失败'}</Tag>;
        } else if (text === UploadResultStatus.UPLOADING) {
          return <Tag color="blue">{() => '上传中'}</Tag>;
        }

        return text;
      },
    },
  ];
}
