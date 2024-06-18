import { computed, getCurrentInstance, ref, unref } from "vue";
import { DrawerInstance } from "/@/modules/component-module/drawer-module/interface/DrawerInstance";
import { tryOnUnmounted } from "@vueuse/core";
import { isProdMode } from "/@/utils/env/method/isProdMode";
import {
  dataTransferRef, UseDrawerReturnType,
  visibleData
} from "/@/modules/component-module/drawer-module/variable/drawerVariable";
import { error } from "/@/utils/log/method/error";
import { DrawerProps } from "/@/modules/component-module/drawer-module/interface/DrawerProps";
import { toRaw } from "@vue/runtime-core";
import { isEqual } from "lodash-es";
import { ReturnMethods } from "/@/modules/component-module/drawer-module/interface/ReturnMethods";

export function useDrawer(): UseDrawerReturnType {
  if (!getCurrentInstance()) {
    throw new Error('useDrawer() can only be used inside setup() or functional components!');
  }
  const drawer = ref<DrawerInstance | null>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<string>('');

  function register(drawerInstance: DrawerInstance, uuid: string) {
    isProdMode() &&
    tryOnUnmounted(() => {
      drawer.value = null;
      loaded.value = null;
      dataTransferRef[unref(uid)] = null;
    });

    if (unref(loaded) && isProdMode() && drawerInstance === unref(drawer)) {
      return;
    }
    uid.value = uuid;
    drawer.value = drawerInstance;
    loaded.value = true;

    drawerInstance.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(drawer);
    if (!instance) {
      error('useDrawer instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    setDrawerProps: (props: Partial<DrawerProps>): void => {
      getInstance()?.setDrawerProps(props);
    },

    getVisible: computed((): boolean => {
      return visibleData[~~unref(uid)];
    }),

    openDrawer: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setDrawerProps({
        visible: visible,
      });
      if (!data) return;

      if (openOnSet) {
        dataTransferRef[unref(uid)] = null;
        dataTransferRef[unref(uid)] = toRaw(data);
        return;
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uid)]), toRaw(data));
      if (!equal) {
        dataTransferRef[unref(uid)] = toRaw(data);
      }
    },
    closeDrawer: () => {
      getInstance()?.setDrawerProps({ visible: false });
    },
  };

  return [register, methods];
}






























































// export class UseDrawer {
//   drawer: Ref<DrawerInstance | null>;
//   loaded: Ref<Nullable<boolean>>;
//   uid: Ref<string>;
//   getVisible: ComputedRef<boolean>;
//   constructor() {
//     if (!getCurrentInstance()) {
//       throw new Error('useDrawer() can only be used inside setup() or functional components!');
//     }
//     this.drawer = ref<DrawerInstance | null>(null);
//     this.loaded = ref<Nullable<boolean>>(false);
//     this.uid = ref<string>('');
//     this.getVisible = computed((): boolean => {
//       return visibleData[~~unref(this.uid)];
//     });
//   }
//   register(drawerInstance: DrawerInstance, uuid: string) {
//     isProdMode() && tryOnUnmounted(() => {
//       this.drawer.value = null;
//       this.loaded.value = null;
//       dataTransferRef[unref(this.uid)] = null;
//     });
//
//     if (unref(this.loaded) && isProdMode() && drawerInstance === unref(this.drawer)) {
//       return;
//     }
//     this.uid.value = uuid;
//     this.drawer.value = drawerInstance;
//     this.loaded.value = true;
//
//     drawerInstance.emitVisible = (visible: boolean, uid: number) => {
//       visibleData[uid] = visible;
//     };
//   }
//
//   getInstance() {
//     const instance = unref(this.drawer);
//     if (!instance) {
//       error('useDrawer instance is undefined!');
//     }
//     return instance;
//   };
//
//   closeDrawer() {
//     this.getInstance()?.setDrawerProps({ visible: false });
//   }
//
//   setDrawerProps(props: Partial<DrawerProps>): void {
//     this.getInstance()?.setDrawerProps(props);
//   }
//   openDrawer<T = any>(visible = true, data?: T, openOnSet = true): void {
//     this.getInstance()?.setDrawerProps({
//       visible: visible,
//     });
//     if (!data) return;
//
//     if (openOnSet) {
//       dataTransferRef[unref(this.uid)] = null;
//       dataTransferRef[unref(this.uid)] = toRaw(data);
//       return;
//     }
//     const equal = isEqual(toRaw(dataTransferRef[unref(this.uid)]), toRaw(data));
//     if (!equal) {
//       dataTransferRef[unref(this.uid)] = toRaw(data);
//     }
//   }
//
//   getMethod() {
//     return [register, methods];
//   }
// }
