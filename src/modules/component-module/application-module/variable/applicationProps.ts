import { prefix_sup } from "/@/modules/config-moudle/variable/configVariable";

export const appLogoProps = {
  theme: {
    type: String,
    validator: (v: string) => ['light', 'dark'].includes(v),
  },
  showTitle: { type: Boolean, default: true },
  alwaysShowTitle: { type: Boolean },
};
export const appProviderProps = {
  prefixCls: { type: String, default: prefix_sup },
};
