import { CSSProperties, PropType } from "vue";
import {
  apiFunParams,
  Options
} from "/@/modules/component-module/cropper-module/variable/copperVariable";
import { ButtonProps } from "/@/modules/component-module/button-module/variable/buttonVariable";

export const CropperProp = {
  src: { type: String, required: true },
  alt: { type: String },
  circled: { type: Boolean, default: false },
  realTimePreview: { type: Boolean, default: true },
  height: { type: [String, Number], default: '360px' },
  crossorigin: {
    type: String as PropType<'' | 'anonymous' | 'use-credentials' | undefined>,
    default: undefined,
  },
  imageStyle: { type: Object as PropType<CSSProperties>, default: () => ({}) },
  options: { type: Object as PropType<Options>, default: () => ({}) },
}

export const CropperAvatarProp = {
  width: { type: [String, Number], default: '200px' },
  value: { type: String },
  showBtn: { type: Boolean, default: true },
  btnProps: { type: Object as PropType<ButtonProps> },
  btnText: { type: String, default: '' },
  uploadApi: { type: Function as PropType<({ file: Blob, name: string }) => Promise<void>> },
  type: { type: String },
}

export const CopperModalProp = {
  circled: { type: Boolean, default: true },
  uploadApi: {
    type: Function as PropType<(params: apiFunParams) => Promise<any>>,
  },
}
