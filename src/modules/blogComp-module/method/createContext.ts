import { InjectionKey } from "vue";
import { CreateContextOptions } from "/@/modules/blogComp-module/interface/CreateContextOptions";
import { provide, reactive } from "@vue/runtime-core";
import { readonly as defineReadonly } from "@vue/runtime-core";

export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {},
) {
  const { readonly = true, createProvider = false, native = false } = options;
  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);
  return {
    state,
  };
}
