import { Ref } from 'vue';

export interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
  isIos: Ref<boolean>;
}
