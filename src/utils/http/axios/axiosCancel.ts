import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import { isFunction } from '/@/utils/is/is';

// Used to store the identification and cancellation function of each request
let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');/*    使用 join 方法，将 method 和 url 以 & 符号连接起来   */

export class AxiosCanceler {

  addPending(config: AxiosRequestConfig) {
    this.removePending(config);/*    添加请求前，删除，避免重复添加     */
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||/*   判断token是否在不在   */
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {   pendingMap.set(url, cancel);   }
      });/*    生成取消令牌用于取消请求   */
  }
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);/*      通过key获取value       */
      cancel && cancel(url);/*       如果 cancel 存在，则调用取消函数来取消请求       */
      pendingMap.delete(url);/*       移除该value       */
    }/*    如果 pendingMap 中存在 url，则说明当前请求正在进行中，需要被取消和移除   */
  }/*   根据config获取对应的url再获取对应的请求然后进行删除，避免重复请求    */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }/*     清空所有正在进行的请求    */
}/*     用于管理和取消 Axios 请求。    */
