import { ApplicationComp } from "/@/modules/component-module/application-module/applicationComp";

export function useDesign(scope: string) {
  const values = ApplicationComp.useAppProviderContext();
  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
