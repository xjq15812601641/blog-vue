import { InjectionKey, ref } from "vue";
import {
  PageContextProps
} from "/@/modules/component-module/layout-module/interface/default/content/PageContextProps";
import {
  createAsyncComponent
} from "/@/modules/component-module/layout-module/method/header/createAsyncComponent";
import FullScreen from "/@/components/layouts/default/header/components/FullScreen.vue";
import { BackgroundEnum } from "/@/enums/backgroundEnum";
import { RouterTransitionModelEnum } from "/@/enums/routerTransitionModelEnum";
import { ProjectConfig } from "/#/config";

// export const select_item_design = useDesign('setting-select-item');
// export const switch_item_design = useDesign('setting-switch-item');
// export const setting_footer_design= useDesign('setting-footer');
// export const sider_wrapper_design= useDesign('layout-sider-wrapper');
// export const sideBar_design = useDesign('layout-sideBar');
// export const header_trigger_design = useDesign('layout-header-trigger');
// export const default_layout_design = useDesign('default-layout');
export const headerHeightRef = ref(0);
export const footerHeightRef = ref(0);

export const layout_key: InjectionKey<PageContextProps> = Symbol();

export type RootSetting = Omit<ProjectConfig, 'headerSetting' | 'menuSetting'>;

export const UserDropDown = createAsyncComponent(() => import('/@/components/layouts/default/header/components/user-dropdown/index.vue'));

export const UserAction = createAsyncComponent(() => import('/@/components/layouts/default/header/components/user-action/index.vue'));

export const LayoutBreadcrumb = createAsyncComponent(() => import('/@/components/layouts/default/header/components/Breadcrumb.vue'));

export const Search = createAsyncComponent(() => import('/@/components/layouts/default/header/components/Search.vue'));
export { FullScreen }
export const thememOptions = [
  {
    value: BackgroundEnum.setBackgroundOne,
    label: '壁纸—1',
  },
  {
    value: BackgroundEnum.setBackgroundTwo,
    label: '壁纸—2',
  },
  {
    value: BackgroundEnum.setBackgroundThree,
    label: '壁纸—3',
  },
];
export const routerTransitionOptions = [
  RouterTransitionModelEnum.ZOOM_FADE,
  RouterTransitionModelEnum.FADE,
  RouterTransitionModelEnum.ZOOM_OUT,
  RouterTransitionModelEnum.FADE_SIDE,
  RouterTransitionModelEnum.FADE_BOTTOM,
  RouterTransitionModelEnum.FADE_SCALE,
].map((item) => {
  return {
    label: item,
    value: item,
  };
});
