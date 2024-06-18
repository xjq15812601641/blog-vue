import { SvgIconProp } from '/@/modules/component-module/icon-module/interface/svgIconProp';
import { computed, CSSProperties } from 'vue';
import iconsData from "/@/modules/component-module/icon-module/variable/icons.data"
import svgIcons from 'virtual:svg-icons-names';


export class IconComp {
  static getSymbolId(svgIconProps: SvgIconProp) {
    return computed(() => `#${svgIconProps.prefix}-${svgIconProps.name}`);
  }
  static getSvgStyle(svgIconProps: SvgIconProp) {
    return computed((): CSSProperties => {
      const { size } = svgIconProps;
      let s = `${size}`;
      s = `${s.replace('px', '')}px`;
      return {
        width: s,
        height: s,
      };
    });
  }
  static getIcons() {
    const data = iconsData as any;
    const prefix: string = data?.prefix ?? '';
    let result: string[] = [];
    if (prefix) {
      result = (data?.icons ?? []).map((item) => `${prefix}:${item}`);
    } else if (Array.isArray(iconsData)) {
      result = iconsData as string[];
    }
    return result;
  }
  static getSvgIcons() {
    return svgIcons.map((icon) => icon.replace('icon-', ''));
  }
}
