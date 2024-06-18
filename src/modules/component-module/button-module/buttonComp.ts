import { computed, unref } from 'vue';
import { BasicButtonProp } from '/@/modules/component-module/button-module/interface/basicButtonProp';

export class ButtonComp {
  static getBasicButtonClass(BasicButtonProps: BasicButtonProp) {
    return computed(() => {
      const { color, disabled } = BasicButtonProps;
      return [
        {
          [`ant-btn-${color}`]: !!color,
          [`is-disabled`]: disabled,
        },
      ];
    });
  }
  static getBasicButtonBindValue(BasicButtonAttr, BasicButtonProps) {
    return computed(() => ({ ...unref(BasicButtonAttr), ...BasicButtonProps }));
  }
}
