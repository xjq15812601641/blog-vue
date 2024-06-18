import { HandlerEnum } from "/@/enums/HandlerEnum";
import { BlogTheme } from "/@/modules/theme_module/BlogTheme";
import { toggleClass } from "/@/modules/theme_module/method/toggleClass";
import { ConfigOption } from "/@/modules/config-moudle/interface/configOption";

export function handler(event: HandlerEnum, value: any): DeepPartial<ConfigOption> {
  switch (event) {
    case HandlerEnum.CHANGE_THEME:
      return { background: value };
    case HandlerEnum.TOGGLE_CANVAS:
      BlogTheme.getCanvas(value);
      return { canvas: value };
    case HandlerEnum.GRAY_MODE:
      toggleClass(value, 'gray-mode');
      return { mode_gray: value };
    case HandlerEnum.COLOR_WEAK:
      toggleClass(value, 'color-weak');
      return { color_weak: value };
    default:
      return {};
  }
}
