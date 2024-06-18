import { appConfigStore } from '/@/modules/store-module/method/appConfigStore';
import { appPermissionStore } from '/@/modules/store-module/method/appPermissionStore';
import { storeRouteRecordRaw } from "/@/modules/store-module/interface/storeRouteRecordRaw";
import { appResponseTime } from "/@/modules/store-module/method/appResponseTimeStore";
import { appThemeStore } from "/@/modules/store-module/method/appThemeStore";
import { Store } from "/@/modules/store-module/store";
import { CacheBasicKey } from "/@/modules/cache-module/interface/cacheBasicKey";
import { appUserStore } from "/@/modules/store-module/method/appUser";
export const store = Store.getStore();
export type routeModule = storeRouteRecordRaw;
export type basicKey = keyof CacheBasicKey;
export const BlogConfigStore = appConfigStore(store);
export const BlogPermissionStore = appPermissionStore(store);
export const BlogResponseStore = appResponseTime(store);
export const BlogThemeStore = appThemeStore(store);
export const BlogUserStore = appUserStore(store)
