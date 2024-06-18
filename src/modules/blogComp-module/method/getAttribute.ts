import { getCurrentInstance, reactive, Ref, shallowRef, watchEffect } from "@vue/runtime-core";
import { Params } from "/@/modules/blogComp-module/interface/Params";
import { entries } from "/@/modules/blogComp-module/method/entries";

export function getAttribute(params: Params = {}): Ref<Recordable> | {} {
  /**
   * 先判断当前组件实例是否存在
   */
  const instance = getCurrentInstance();
  if (!instance) return {};
  const vueAttribute = /^on[A-Z]/;
  const normalAttribute = ['class', 'style'];

  /**
   * 定义一个寻找v-on属性的规则
   * 定义一个class和style的数组
   * 创建一个空对象作为响应式参数
   * 根据条件与excludeKeys这个参数合并
   * 将instance.attrs转换为响应式对象
   */
  const { excludeListeners = false, excludeKeys = [], excludeDefaultKeys = true } = params;
  instance.attrs = reactive(instance.attrs);
  const attrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(excludeDefaultKeys ? normalAttribute : []);
  instance.attrs = reactive(instance.attrs);
  /**
   * 使用 watchEffect 监听 instance.attrs 的变化，并根据条件过滤和处理属性，将结果赋值给 attrs
   */
  watchEffect(() => {
    // 通过 entries 方法将 instance.attrs 转换为由键值对数组组成的数组
    const res = entries(instance.attrs).reduce((acm, [key, val]) => {
      // 根据条件过滤属性
      if (!allExcludeKeys.includes(key) && !(excludeListeners && vueAttribute.test(key))) {
        acm[key] = val;
      }
      return acm;
    }, {} as Recordable);
    console.log('daafa')
    // 将处理后的结果赋值给 attrs 的 value 属性
    attrs.value = res;
  });
  return attrs;
}
