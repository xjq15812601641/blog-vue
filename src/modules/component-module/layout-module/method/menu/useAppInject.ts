import { computed, unref } from "vue";
import {
  AppProviderContextProps
} from "/@/modules/component-module/application-module/interface/appProviderContextProps";
import {
  AppKey
} from "/@/modules/component-module/application-module/variable/applicationVariable";
import { useContext } from "/@/modules/blogComp-module/method/useContext";

export function useAppInject() {
  const values = useContext<AppProviderContextProps>(AppKey);;

  return {
    getIsMobile: computed(() => unref(values.isMobile)),
    getIsIOS: computed(() => unref(values.isIos)),
  };
}
