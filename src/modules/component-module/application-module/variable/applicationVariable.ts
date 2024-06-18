import { InjectionKey } from 'vue';
import appLogo from '/@/components/Application/AppLogo.vue';
import appProvider from '/@/components/Application/AppProvider.vue';
import { AppProviderContextProps } from '/@/modules/component-module/application-module/interface/appProviderContextProps';
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";

export const AppLogo = initComponent(appLogo);
export const AppProvider = initComponent(appProvider);
export const AppKey: InjectionKey<AppProviderContextProps> = Symbol();

