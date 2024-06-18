import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { RequestOptions, Result, UploadFileParams } from '/#/axios';
import type { CreateAxiosOptions } from './axiosTransform';
import axios from 'axios';
import qs from 'qs';
import { AxiosCanceler } from './axiosCancel';
import { cloneDeep } from 'lodash-es';
import { isFunction } from "/@/utils/is/is";
import { ContentTypeEnum } from "/@/enums/ContentTypeEnum";
import { RequestEnum } from "/@/enums/RequestEnum";
import { isProdMode } from "/@/utils/env/method/isProdMode";


export * from './axiosTransform';

export class VAxios {
  private axiosInstance: AxiosInstance;/*   用于发送HTTP请求和处理响应   */
  private readonly options: CreateAxiosOptions;/*   就是opt   */

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);/*    创建一个新的axios实例    */
    this.setupInterceptors();
  }/*    使用这个构造函数初始化值   */

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  private getTransform() {
    const { transform } = this.options;
    return transform;
  }/*   获取请求前后处理规则   */

  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  private setupInterceptors() {
    const transform = this.getTransform();/*   获取请求前后处理规则   */
    if (!transform) {
      return;
    }/*   不能为空   */
    const {requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch,} = transform;/*获取函数*/
    const axiosCanceler = new AxiosCanceler();/*     用于管理和取消 Axios 请求。    */

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const { ignoreCancelToken } = config.requestOptions;
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken;/*    如果 ignoreCancelToken 存在，则使用它的值；否则，调用另一个属性值。   */

      !ignoreCancel && axiosCanceler.addPending(config);/*    添加该config的url到请求中    */
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options);
      }/*     确认函数存在就为config添加拦截器     */
      return config;
    }, undefined);/*     添加一个请求拦截器在发送请求之前执行     */


    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);/*     为请求添加发生错误时的拦截处理     */

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);/*      添加拦截器      */

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, (error) => {/*    undefined 表示在响应成功时不执行任何操作。    err用于处理响应失败的情况*/
        responseInterceptorsCatch(this.axiosInstance, error);/*   当响应拦截器发生错误时，responseInterceptorsCatch 函数会被调用来处理错误。    */
      });/*     interceptors 对象注册响应拦截器      */
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        ignoreCancelToken: true,
      },
    });
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    /*获取请求配置中的headers对象，如果不存在则获取默认的headers对象*/
    const headers = config.headers || this.options.headers;
    /*从headers对象中获取Content-Type字段的值，如果不存在则获取content-type字段的值*/
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];
    /*如果Content-Type不等于ContentTypeEnum.FORM_URLENCODED（表单编码类型）或者请求配置中没有data字段，或者请求方法是GET方法，则直接返回原始的请求配置对象config*/
    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    /*将data字段使用qs.stringify方法进行序列化。*/
    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options);
  }
  faget<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.getTest({ ...config});
  }
  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options);
  }
  fapost<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.postTest({ ...config });
  }

  patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PATCH' }, options);
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options);
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options);
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    /*克隆了一个配置对象config*/
    let conf: CreateAxiosOptions = cloneDeep(config);
    /*对请求的处理*/
    const transform = this.getTransform();
    /*请求配置拼接*/
    const { requestOptions } = this.options;
    /*opt赋值给conf的requestOptions属性*/
    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    /*对表单数据进行处理*/
    conf = this.supportFormData(conf);

    if (isProdMode()) {
      /* 因涉及到js逆向，加密代码不公开 */
    }
    return new Promise((resolve, reject) => {
      /*用request方法发送请求，传入conf作为请求配置*/
      /*处理响应res*/
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }


  postTest<T = any>(config: AxiosRequestConfig): Promise<T>{
    axios.defaults.baseURL = 'http://139.159.216.140:9076/blog';
    return new Promise((resolve, reject) => {
      if (config.url != null) {
        axios.post(config.url, config)
          .then((response) => {
            resolve(response.data as T);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  getTest<T = any>(config: AxiosRequestConfig): Promise<T>{
    axios.defaults.baseURL = 'http://139.159.216.140:9076/blog';
    return new Promise((resolve, reject) => {
      if (config.url != null) {
        axios.get(config.url, config)
          .then((response) => {
            resolve(response.data as T);
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

}
