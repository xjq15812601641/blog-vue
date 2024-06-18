import { propTypes } from "/@/utils/propType/propTypes";

export const StrengthMeterProp = {
  value: propTypes.string,
  showInput: propTypes.bool.def(true),
  disabled: propTypes.bool,
}
