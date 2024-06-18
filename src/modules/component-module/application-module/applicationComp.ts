import { AppProviderContextProps } from '/@/modules/component-module/application-module/interface/appProviderContextProps';
import { AppKey } from '/@/modules/component-module/application-module/variable/applicationVariable';
import { computed } from 'vue';
import { AppLogoProp } from '/@/modules/component-module/application-module/interface/appLogoProp';
import { useGo } from "/@/modules/blogComp-module/method/useGo";
import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
import { useContext } from "/@/modules/blogComp-module/method/useContext";
import { createContext } from "/@/modules/blogComp-module/method/createContext";

export class ApplicationComp {
  static createAppProviderContext(context: AppProviderContextProps) {
    return createContext<AppProviderContextProps>(context, AppKey);
  }
  static useAppProviderContext() {
    return useContext<AppProviderContextProps>(AppKey);
  }
  static getAppLogoClass(AppLogoProps: AppLogoProp) {
    return computed(() => [useDesign('app-logo'), AppLogoProps.theme]);
  }
  static getTitleClass(AppLogoProps: AppLogoProp) {
    return computed(() => [
      `${useDesign('app-logo')}__title`,
      { 'xs:opacity-0': !AppLogoProps.alwaysShowTitle },
    ]);
  }
  static go_dashboard() {
    return useGo()('/dashboard');
  }
}
