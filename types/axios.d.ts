export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  joinParamsToUrl?: boolean;/*将请求参数拼接到 url*/
  formatDate?: boolean;/*格式化请求参数时间*/
  isTransformResponse?: boolean;/*是否处理请求结果*/
  isReturnNativeResponse?: boolean;/*是否获取响应头*/
  joinPrefix?: boolean;/*是否拼接/blog*/
  apiUrl?: string;/*接口地址，如果留空，请使用默认的 apiUrl*/
  urlPrefix?: string;/*/blog*/
  errorMessageMode?: ErrorMessageMode;/*错误信息类型*/
  joinTime?: boolean;/*是否添加时间截*/
  ignoreCancelToken?: boolean;/*是否忽视返回的token*/
  withToken?: boolean;/*是否再请求头中发送token*/
}

export interface Result<T = any> {
  [x: string]: any;
  status: number;
  message?: string;
  data: T;
}

export type BucketType = 'user';

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // 桶名
  type: BucketType;
  // file name
  filename?: string;
  [key: string]: any;
}
