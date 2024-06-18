import { defHttp } from '/@/utils/http/axios';
import { UploadApiResult } from './model/indexModel';
import { UploadFileParams } from '/#/axios';
import { commonSuccessModel } from '../common/indexModel';
import type { AxiosResponse } from 'axios';
import { useGlobSetting } from "/@/api/useGlobSetting";

const { uploadCommonUrl = '' } = useGlobSetting();

enum Api {
  removeAvatar = '/minio-client/delete',
  fileStream = '/minio-client/download',
}

/**
 * @description: 上传文件
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadCommonUrl,
      onUploadProgress,
    },
    params,
  );
}

/* 获取minio文件流 */
export function getFileStream(filename: string, params) {
  return defHttp.get<AxiosResponse<Blob>>(
    {
      url: `${Api.fileStream}/${filename}`,
      params,
      responseType: 'blob',
    },

    { isReturnNativeResponse: true },
  );
}

/* 删除老的文件 */
export function deleteFileApi(filename: string, params) {
  return defHttp.post<commonSuccessModel>({
    url: `${Api.removeAvatar}/${filename}`,
    params,
  });
}
