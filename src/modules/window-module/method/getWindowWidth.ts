import { ScreenEnum } from '/@/enums/screenEnum';
import { YardageEnum } from '/@/enums/yardageEnum';

export function getWindowWidth(screenRef, realWidthRef) {
  const width = document.body.clientWidth;
  if (width < ScreenEnum.XS) {
    screenRef.value = YardageEnum.XS;
  } else if (width < ScreenEnum.SM) {
    screenRef.value = YardageEnum.SM;
  } else if (width < ScreenEnum.MD) {
    screenRef.value = YardageEnum.MD;
  } else if (width < ScreenEnum.LG) {
    screenRef.value = YardageEnum.LG;
  } else if (width < ScreenEnum.XL) {
    screenRef.value = YardageEnum.XL;
  } else {
    screenRef.value = YardageEnum.XXL;
  }
  realWidthRef.value = width;
}
