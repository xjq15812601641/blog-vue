import { InjectionKey } from "vue";
import { ShallowUnwrap } from "/@/modules/blogComp-module/variable/BlogComponentVariable";
import { inject } from "@vue/runtime-core";

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;
export function useContext<T>(key: InjectionKey<T>, defaultValue?: any, native?: boolean): T;
export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {}) as ShallowUnwrap<T>;
}
