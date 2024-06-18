/**
 * 该ts文件创建一个请求实例
 */

import type { AxiosResponse } from 'axios';
import { clone } from 'lodash-es';
import type { RequestOptions, Result } from '/#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { joinTimestamp, formatRequestDate } from './helper';
import { useGlobSetting } from "/@/api/useGlobSetting";
import { BlogMessage } from "/@/modules/message-module/blogMessage";
import { ContentTypeEnum } from "/@/enums/ContentTypeEnum";
import { RequestEnum } from "/@/enums/RequestEnum";
import { isString } from "/@/utils/is/is";
import { deepMerge, setObjToUrlParams } from "/@/utils/BlogUtils";
import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
import { isProdMode } from "/@/utils/env/method/isProdMode";

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const { createMessage, createDesignateModal } = BlogMessage.useMessage();


const transform: AxiosTransform = {/*数据处理，方便区分多种处理方式*/

  transformRequestHook: (res: AxiosResponse<Result>, options: RequestOptions) => {


    const { isTransformResponse, isReturnNativeResponse } = options;/*      从options值中获取RequestOptions属性      */
    if (isReturnNativeResponse) {   return res;   }/*     是否返回原生响应头 比如：需要获取响应头时使用该属性      */
    if (!isTransformResponse) {   return res.data;    }/*     用于页面代码可能需要直接获取code，data，message这些信息时开启      */
    const { data: originData } = res;/*     获取返回的值      */
    if (!originData) {    throw new Error('请求失败');    }/*     如果值不存在直接抛出异常      */
    const { data } = res;
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    // const { status, data, message } = originData;
    // 这里逻辑可以根据项目进行修改
    // debugger;
    // const hasSuccess =
    //   originData && Reflect.has(originData, 'status') && status === ResultEnum.SUCCESS;
    // if (hasSuccess) {
    //   return data;
    // }
    // debugger;
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    // let timeoutMsg = '';
    // switch (status) {
    //   case ResultEnum.UNAUTHORIZED:
    //     timeoutMsg = message || '暂无权限操作';
    //     const userStore = useUserStoreWithOut();
    //     userStore.setToken(undefined);
    //     setTimeout(() => {
    //       userStore.logout();
    //     }, 1000);
    //     break;
    //   default:
    //     if (message) {
    //       timeoutMsg = message;
    //     }
    // }
    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    // if (options.errorMessageMode === 'modal') {
    //   createErrorModal({ title: '错误提示', content: timeoutMsg });
    // } else {
    //   createMessage.error(timeoutMsg);
    // }
    // throw new Error(timeoutMsg || '接口请求失败');
    return data;
  },/*  处理请求数据。如果数据不是预期格式，可直接抛出错误 */

  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;/*    这些布尔属性用来判断是否对请求路径进行修改   */
    if (joinPrefix) {   config.url = `${urlPrefix}${config.url}`;   }/*   判断joinPrefix是否为ture，然后是否在前面拼接拼接/blog   */
    if (apiUrl && isString(apiUrl)) {   config.url = `${apiUrl}${config.url}`;   }/*    判断apiUrl是否不为空且类型是string，来决定是否在前面拼接apiUrl   */
    const params = config.params || {};/*    获取params若为空则返回一个空对象     */
    const data = config.data || false;/*    如果data被定义就为实际值，若没有被定义则赋为布尔值false    */
    formatDate && data && !isString(data) && formatRequestDate(data);/*     如果formatDate和data被定义且data不是string类型就对data进行日期格式化     */
    if (config.method?.toUpperCase() === RequestEnum.GET) {/*将method值大写化，判断是否为GET字符串*/
      /*这边是get请求的处理*/
      if (!isString(params)) {config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));}/*    如果不是字符串，传入joinTime==ture和false获取时间戳参数，然后与参数合并从而避免从缓存中拿数据。     */
      else {config.url = config.url + params + `${joinTimestamp(joinTime, true)}`; config.params = undefined;}} /*      如果是字符串就与一个不带参数的时间截字符串合并     */
    else {
      /*这边是post请求的处理*/
      if (!isString(params)) {
        formatDate && formatRequestDate(params);/*  和上面一样   */
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {/*     验证config对象中是否存在data属性，并且这个属性是一个对象，同时该对象包含多于一个的键     */
          config.data = Object.assign(data, joinTimestamp(joinTime, false));/*  和上面一样   */
          config.params = params;}
        else {
          /*    如果没有提供data，则将params视为data   */
          config.data = Object.assign(params, joinTimestamp(joinTime, false));/*    和上面一样   */
          config.params = undefined;
        }/*配置config.data*/
        if (joinParamsToUrl) {config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));}/*   和上面一样    */
      }
      else {config.url = config.url + params;config.params = undefined;}
    }/*如果有参数，就进行处理，没有参数就合并时间截，符合rest风格请求*/
    return config;
  },/*请求之前处理config*/

  requestInterceptors: (config, options) => {
    const userStore = BlogUserStore;/*      获取状态管理库对象     */
    const token = userStore.getToken;/*      从状态管理库对象中获取当前的token     */
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      (config as Recordable).headers.Authorization = /*   在请求头（headers）中设置Authorization字段    */
        options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;/*    看options的authenticationScheme是否提供了参数来决定是否在token前添加      */
    }/*     检查是否存在token，并且当前的配置对象config中是否有一个requestOptions属性，且其withToken设置为true（默认为true，除非明确设置为false）。     */
    return config;
  },/*请求拦截器处理*/

  responseInterceptors: (res: AxiosResponse<any>) => {
    if (
      isProdMode() &&
      res.data &&
      res.data.data &&
      !res.config.url?.includes('minio-client/upload')
    ) {
      /* 涉及js逆向，加密代码不公开 */
    }
    return res;
  },/*响应拦截器处理*/

  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    axiosInstance.data;
    const { response, code, message, config } = error || {};/*      从错误对象中解构出response、code、message和config属性,否则为空      */
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';/*      从config对象的requestOptions中获取errorMessageMode属性，如果不存在则默认为'none'     */
    const msg: string = response?.data?.message ?? '';/*      从响应数据中获取消息，如果响应数据不存在或没有message属性，则默认为空字符串     */
    const err: string = error?.toString?.() ?? '';/*      将错误转换成字符串形式，如果错误不存在或没有toString方法，则默认为空字符串     */
    let errMessage = '';

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {   errMessage = '请求超时';    }/*     如果错误码是ECONNABORTED并且错误信息包含timeout，则设置errMessage为'请求超时'      */
      if (err?.includes('Network Error')) {   errMessage = '网络异常';    }/*     如果错误信息包含'Network Error'，则设置errMessage为'网络异常'      */

      if (errMessage) {
        if (errorMessageMode === 'modal') {   createDesignateModal('close',{ title: '未知提示', content: errMessage });   }
        else if (errorMessageMode === 'message') {    createMessage.error(errMessage);    }
        return Promise.reject(error);
      }/*     如果已经设置了errMessage，根据errorMessageMode的值决定如何展示错误信息      */
    } catch (error) {   throw new Error(error as unknown as string);    }/*       安全转换为 string 的值       */

    checkStatus(error?.response?.status, msg, errorMessageMode);/*    再次检查错误类型    */
    return Promise.reject(error);
  },/*响应错误处理*/
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {/*opt 参数，用于覆盖默认的配置选项*/
  return new VAxios(
    deepMerge(/*使用 deepMerge 方法将传入 opt 参数与默认配置选项进行深度合并*/
      {
        withCredentials:  true,
        authenticationScheme: '',/*身份验证方案，默认为空字符串*/
        timeout: 10 * 1000,/*请求超时时间，默认为 10 秒*/
        headers: { 'Content-Type': ContentTypeEnum.JSON },/*请求头表示请求的内容类型为 JSON。*/
        transform: clone(transform),/*请求和响应的转换函数，表示使用 transform 函数进行转换*/
        requestOptions: {/*请求选项的配置项，可以在独立的接口请求中覆盖*/
          joinPrefix: true,/*是否将 urlPrefix 添加到请求的 URL 中*/
          isReturnNativeResponse: false,/*是否返回原生响应头，默认为 false*/
          isTransformResponse: true,/*需要对返回数据进行处理*/
          joinParamsToUrl: false,/*post请求的时候添加参数到url*/
          formatDate: true,/*格式化提交参数时间*/
          errorMessageMode: 'message',/*消息提示类型*/
          apiUrl: globSetting.apiUrl,/*接口地址,默认为 globSetting.apiUrl*/
          urlPrefix: urlPrefix,/*接口拼接地址urlPrefix*/
          joinTime: true,/*是否加入时间戳*/
          ignoreCancelToken: true,/*忽略重复请求*/
          withToken: true,/*是否携带token*/
          retryRequest: {/*重试请求的配置项*/
            isOpenRetry: true,/*是否开启重试*/
            count: 5,/*重试次数，默认为 5 次*/
            waitTime: 100,/*重试等待时间，默认为 100 毫秒*/
          },
        },
      },
      opt || {},/**/
    ),
  );
}
export const defHttp = createAxios();

// other api url
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });
