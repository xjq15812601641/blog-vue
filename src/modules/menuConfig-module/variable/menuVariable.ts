import { appConfigStore } from "/@/modules/store-module/method/appConfigStore";
import { ref } from "vue";

export const menu_appStore = appConfigStore();
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 48;
export const SIDE_BAR_MINI_WIDTH = 80;
export const mixSideHasChildren = ref(false);
