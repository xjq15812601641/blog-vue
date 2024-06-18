import { ModalMethods } from "/@/modules/component-module/modal-module/interface/ModalMethods";
import { ReturnMethods } from "/@/modules/component-module/modal-module/interface/ReturnMethods";
import {
  ReturnInnerMethods
} from "/@/modules/component-module/modal-module/interface/ReturnInnerMethods";
import { InjectionKey, reactive } from "vue";
import {
  ModalContextProps
} from "/@/modules/component-module/modal-module/interface/ModalContextProps";

export const modal_key: InjectionKey<ModalContextProps> = Symbol();

export type RegisterFn = (modalMethods: ModalMethods, uuid?: string) => void;
export type UseModalReturnType = [RegisterFn, ReturnMethods];
export type UseModalInnerReturnType = [RegisterFn, ReturnInnerMethods];
export const dataTransfer = reactive<any>({});
export const modal_close_array = ['cancel', 'fullscreen'];
export const basic_modal_array = ['visible-change', 'height-change', 'cancel', 'ok', 'register', 'update:visible'];
export const visibleData = reactive<{ [key: number]: boolean }>({});

