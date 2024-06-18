import { UploadResultStatus } from "/@/enums/uploadResultStatus";
import { UploadApiResult } from "/@/api/minio/model/indexModel";

export interface FileItem {
  thumbUrl?: string;
  name: string;
  size: string | number;
  type?: string;
  percent: number;
  file: File;
  status?: UploadResultStatus;
  responseData?: UploadApiResult;
  uuid: string;
}
