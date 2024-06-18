import { Ref } from "vue";
import { Props } from "/@/modules/component-module/simpleMenu-module/interface/Props";

export interface SubMenuProvider {
  addSubMenu: (name: string | number, update?: boolean) => void;
  removeSubMenu: (name: string | number, update?: boolean) => void;
  removeAll: () => void;
  sliceIndex: (index: number) => void;
  isRemoveAllPopup: Ref<boolean>;
  getOpenNames: () => (string | number)[];
  handleMouseleave?: Fn;
  level: number;
  props: Props;
}
