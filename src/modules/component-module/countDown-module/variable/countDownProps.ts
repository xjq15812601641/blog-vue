import { PropType } from "vue";

export const countDownProp = {
  value: { type: [Object, Number, String, Array] },
  count: { type: Number, default: 60 },
  beforeStartFunc: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
};

export const countDownInputProp = {
  value: { type: String },
  size: { type: String, validator: (v) => ['default', 'large', 'small'].includes(v) },
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
};
