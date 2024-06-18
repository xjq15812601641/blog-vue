import {
  computed,
  getCurrentInstance,
  nextTick,
  ref,
  unref,
  watchEffect
} from "vue";
import { DrawerInstance } from "/@/modules/component-module/drawer-module/interface/DrawerInstance";
import { error } from "/@/utils/log/method/error";
import { tryOnUnmounted } from "@vueuse/core";
import { isProdMode } from "/@/utils/env/method/isProdMode";
import {
  dataTransferRef, UseDrawerInnerReturnType,
  visibleData
} from "/@/modules/component-module/drawer-module/variable/drawerVariable";
import { isFunction } from "/@/utils/is/is";
import { DrawerProps } from "/@/modules/component-module/drawer-module/interface/DrawerProps";

export const useDrawerInner = (callbackFn?: Fn): UseDrawerInnerReturnType => {
  const drawerInstanceRef = ref<Nullable<DrawerInstance>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  if (!getCurrentInstance()) {
    throw new Error('useDrawerInner() can only be used inside setup() or functional components!');
  }

  const getInstance = () => {
    const instance = unref(drawerInstanceRef);
    if (!instance) {
      error('useDrawerInner instance is undefined!');
      return;
    }
    return instance;
  };

  const register = (modalInstance: DrawerInstance, uuid: string) => {
    isProdMode() &&
    tryOnUnmounted(() => {
      drawerInstanceRef.value = null;
    });

    uidRef.value = uuid;
    drawerInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransferRef[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setDrawerProps({ loading });
      },

      changeOkLoading: (loading = true) => {
        getInstance()?.setDrawerProps({ confirmLoading: loading });
      },
      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)];
      }),

      closeDrawer: () => {
        getInstance()?.setDrawerProps({ visible: false });
      },

      setDrawerProps: (props: Partial<DrawerProps>) => {
        getInstance()?.setDrawerProps(props);
      },
    },
  ];
};



































// export class UseDrawerInner {
//   drawerInstanceRef: Ref<Nullable<DrawerInstance>>;
//   currentInstance: any;
//   uidRef: Ref<string>;
//   getVisible: ComputedRef<boolean>;
//   constructor(callbackFn?: Fn) {
//     if (!getCurrentInstance()) {
//       throw new Error('useDrawerInner() can only be used inside setup() or functional components!');
//     }
//     this.drawerInstanceRef = ref<Nullable<DrawerInstance>>(null);
//     this.currentInstance = getCurrentInstance();
//     this.uidRef = ref<string>('');
//     this.getVisible = computed((): boolean => {
//       return visibleData[~~unref(this.uidRef)];
//     });
//     callbackFn && watchEffect(() => {
//       const data = dataTransferRef[unref(this.uidRef)];
//       if (!data) return;
//       if (!callbackFn || !isFunction(callbackFn)) return;
//       nextTick(() => {
//         callbackFn(data);
//       });
//     });
//   }
//   getInstance() {
//     const instance = unref(this.drawerInstanceRef);
//     if (!instance) {
//       error('useDrawerInner instance is undefined!');
//       return;
//     }
//     return instance;
//   };
//
//   register(modalInstance: DrawerInstance, uuid: string) {
//     isProdMode() &&
//     tryOnUnmounted(() => {
//       this.drawerInstanceRef.value = null;
//     });
//     this.uidRef.value = uuid;
//     this.drawerInstanceRef.value = modalInstance;
//     this.currentInstance?.emit('register', modalInstance, uuid);
//   };
//
//   changeLoading(loading = true) {
//     this.getInstance()?.setDrawerProps({ loading });
//   }
//   changeOkLoading(loading = true) {
//     this.getInstance()?.setDrawerProps({ confirmLoading: loading });
//   }
//   closeDrawer() {
//     this.getInstance()?.setDrawerProps({ visible: false });
//   }
//
//   setDrawerProps(props: Partial<DrawerProps>) {
//     this.getInstance()?.setDrawerProps(props);
//   }
// }
