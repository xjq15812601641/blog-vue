import { Ref } from 'vue';

export interface UseEventParams {
  // 要添加事件监听器的元素
  el?: Element | Ref<Element | undefined> | Window | any;
  // 要监听的事件名称
  name: string;
  // 事件监听器的回调函数
  listener: EventListener;
  // 配置事件监听器的选项
  options?: boolean | AddEventListenerOptions;
  // 是否在组件销毁时自动移除事件监听器，默认为 true
  autoRemove?: boolean;
  // 是否使用防抖函数来处理事件回调，默认为 true
  isDebounce?: boolean;
  // 表示防抖或节流函数的等待时间，默认为 80
  wait?: number;
}
