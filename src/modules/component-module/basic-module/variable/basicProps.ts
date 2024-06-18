import { PropType } from "vue";

export const basicArrowProps = {
  expand: { type: Boolean },
  up: { type: Boolean },
  down: { type: Boolean },
  inset: { type: Boolean },
};
export const basicHelpProps = {
  maxWidth: { type: String, default: '600px' },
  showIndex: { type: Boolean },
  color: { type: String, default: '#ffffff' },
  fontSize: { type: String, default: '14px' },
  placement: { type: String, default: 'right' },
  text: { type: [Array, String] as PropType<string[] | string> },
};
export const basicTitleProps = {
  helpMessage: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  span: { type: Boolean },
  normal: { type: Boolean },
};
