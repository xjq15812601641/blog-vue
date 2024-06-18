/**
 * 该ts文件是对defHttp中的opt参数的封装
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, Result } from '/#/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;/*身份验证方案*/
  transform?: AxiosTransform;/*请求和响应的转换函数*/
  requestOptions?: RequestOptions;/*请求选项的配置项*/
}

export abstract class AxiosTransform {
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;/*发送请求之前对请求进行自定义处理*/
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions) => any;/*请求成功之后*/
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;/*请求发生错误时进行自定义的错误处理*/
  requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions,) => AxiosRequestConfig;/*请求之前的拦截器*/
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;/*请求之后的拦截器*/
  requestInterceptorsCatch?: (error: Error) => void;/*请求之前的拦截器错误处理*/
  responseInterceptorsCatch?: (axiosInstance: AxiosResponse, error: Error) => void;/*请求之后的拦截器错误处理*/
}
