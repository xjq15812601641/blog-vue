import { PropType } from "vue";
import { HandlerEnum } from "/@/enums/HandlerEnum";
import { propTypes } from "/@/utils/propType/propTypes";

export const SelectItemProp = {
  event: {
    type: Number as PropType<HandlerEnum>,
  },
  disabled: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  def: {
    type: [String, Number] as PropType<string | number>,
  },
  initValue: {
    type: [String, Number] as PropType<string | number>,
  },
  options: {
    type: Array as PropType<LabelValueOptions>,
    default: () => [],
  },
};

export const SwitchItemProp = {
  event: {
    type: Number as PropType<HandlerEnum>,
  },
  disabled: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  def: {
    type: Boolean,
  },
}
export const TriggerProp = { sider: propTypes.bool.def(true) }
