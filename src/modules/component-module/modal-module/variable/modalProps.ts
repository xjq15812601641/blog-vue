import { CSSProperties, PropType } from "vue";
import { ButtonProps } from "ant-design-vue/es/button/buttonTypes";
import {
  ModalWrapperProps
} from "/@/modules/component-module/modal-module/interface/ModalWrapperProps";
import { propTypes } from "/@/utils/propType/propTypes";

export const modalProps = {
  visible: { type: Boolean },
  scrollTop: { type: Boolean, default: true },
  height: { type: Number },
  minHeight: { type: Number },
  // open drag
  draggable: { type: Boolean, default: true },
  centered: { type: Boolean },
  cancelText: { type: String, default: '取消' },
  okText: { type: String, default: '确定' },

  closeFunc: Function as PropType<() => Promise<boolean>>,
};

export const basicProps = Object.assign({}, modalProps, {
  defaultFullscreen: { type: Boolean },
  // Can it be full screen
  canFullscreen: { type: Boolean, default: true },
  // After enabling the wrapper, the bottom can be increased in height
  wrapperFooterOffset: { type: Number, default: 0 },
  // Warm reminder message
  helpMessage: [String, Array] as PropType<string | string[]>,
  // Whether to setting wrapper
  useWrapper: { type: Boolean, default: true },
  loading: { type: Boolean },
  loadingTip: { type: String },
  /**
   * @description: Show close button
   */
  showCancelBtn: { type: Boolean, default: true },
  /**
   * @description: Show confirmation button
   */
  showOkBtn: { type: Boolean, default: true },

  wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,

  afterClose: Function as PropType<() => Promise<VueNode>>,

  bodyStyle: Object as PropType<CSSProperties>,

  closable: { type: Boolean, default: true },

  closeIcon: Object as PropType<VueNode>,

  confirmLoading: { type: Boolean },

  destroyOnClose: { type: Boolean },

  footer: Object as PropType<VueNode>,

  getContainer: Function as PropType<() => any>,

  mask: { type: Boolean, default: true },

  maskClosable: { type: Boolean, default: true },
  keyboard: { type: Boolean, default: true },

  maskStyle: Object as PropType<CSSProperties>,

  okType: { type: String, default: 'primary' },

  okButtonProps: Object as PropType<ButtonProps>,

  cancelButtonProps: Object as PropType<ButtonProps>,

  title: { type: String },

  visible: { type: Boolean },

  width: [String, Number] as PropType<string | number>,

  wrapClassName: { type: String },

  zIndex: { type: Number },
});

export const modalCloseProps = {
  canFullscreen: { type: Boolean, default: true },
  fullScreen: { type: Boolean },
}
export const modalWrapperProps = {
  loading: { type: Boolean },
  useWrapper: { type: Boolean, default: true },
  modalHeaderHeight: { type: Number, default: 57 },
  modalFooterHeight: { type: Number, default: 74 },
  minHeight: { type: Number, default: 200 },
  height: { type: Number },
  footerOffset: { type: Number, default: 0 },
  visible: { type: Boolean },
  fullScreen: { type: Boolean },
  loadingTip: { type: String },
}

export const ThumbUrlProps = {
  fileUrl: propTypes.string.def(''),
  fileName: propTypes.string.def(''),
}
