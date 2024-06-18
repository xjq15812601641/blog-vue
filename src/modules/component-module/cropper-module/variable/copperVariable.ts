import Cropper from "cropperjs";
import cropperImage from '/@/components/Cropper/Cropper.vue'
import avatarCropper from '/@/components/Cropper/CropperAvatar.vue'
import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
import { initComponent } from "/@/modules/blogComp-module/method/initComponent";
export type Options = Cropper.Options;
export type apiFunParams = { file: Blob; name: string; filename: string; data: Recordable };
export const image_prefix = useDesign('cropper-image');
export const avatar_prefix = useDesign('cropper-avatar');
export  const am_prefix = useDesign('cropper-am');
export const CropperImage = initComponent(cropperImage);
export const CropperAvatar = initComponent(avatarCropper);
export const defaultOptions: Options = {
  aspectRatio: 1,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  cropBoxMovable: true,
  cropBoxResizable: true,
  toggleDragModeOnDblclick: true,
  autoCrop: true,
  background: true,
  highlight: true,
  center: true,
  responsive: true,
  restore: true,
  checkCrossOrigin: true,
  checkOrientation: true,
  scalable: true,
  modal: true,
  guides: true,
  movable: true,
  rotatable: true,
};
