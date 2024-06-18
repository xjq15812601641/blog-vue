export const basicButtonProps = {
  color: { type: String, validator: (v) => ['error', 'warning', 'success', ''].includes(v) },
  loading: { type: Boolean },
  disabled: { type: Boolean },
  preIcon: { type: String },
  postIcon: { type: String },
  iconSize: { type: Number, default: 14 },
  onClick: { type: Function as PropType<(...args) => any>, default: null },
};
export const popButtonProps = {
  enable: {
    type: Boolean,
    default: true,
  },
};
