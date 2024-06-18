
import { computed, CSSProperties } from 'vue';
import { BasicArrowProp } from '/@/modules/component-module/basic-module/interface/basicArrowProp';
import { BasicHelpProp } from '/@/modules/component-module/basic-module/interface/basicHelpProp';
import { BasicTitleProp } from '/@/modules/component-module/basic-module/interface/basicTitleProp';

export class BasicComp {
  // static getBasicClass(BasicArrowProps: BasicArrowProp) {
  //   return computed(() => {
  //     const { expand, up, down, inset } = BasicArrowProps;
  //     return [
  //       prefix_arrow,
  //       {
  //         [`${prefix_arrow}--active`]: expand,
  //         up,
  //         inset,
  //         down,
  //       },
  //     ];
  //   });
  // }
  static getTooltipStyle(BasicHelpProps: BasicHelpProp) {
    return computed(
      (): CSSProperties => ({ color: BasicHelpProps.color, fontSize: BasicHelpProps.fontSize }),
    );
  }
  static getOverlayStyle(BasicHelpProps: BasicHelpProp) {
    return computed((): CSSProperties => ({ maxWidth: BasicHelpProps.maxWidth }));
  }
  // static getBasicTitleClass(BasicTitleProps: BasicTitleProp, slots) {
  //   return computed(() => [
  //     prefix_title,
  //     { [`${prefix_title}-show-span`]: BasicTitleProps.span && slots.default },
  //     { [`${prefix_title}-normal`]: BasicTitleProps.normal },
  //   ]);
  // }
}
