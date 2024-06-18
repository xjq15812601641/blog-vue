export interface CacheSetting<V = any> {
  /**
   * 为缓存键设置要存储的值
   */
  value?: V;
  /**
   * 定时器
   */
  timeoutId?: ReturnType<typeof setTimeout>;
  /**
   * 当前时间，配合alive定义新的到期时间expires
   */
  time?: number;
  /**
   * 默认存活时间，配置time定义新的到期时间expires
   */
  alive?: number;
}
