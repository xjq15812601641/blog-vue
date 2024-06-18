import { getRainCanvas } from '/@/modules/theme_module/method/getRainCanvas';
import { getSakuraCanvas } from "/@/modules/theme_module/method/getSakuraCanvas";

export class BlogTheme {
  static getCanvas(flag: boolean) {
    const random = Math.random() * 10;
    if (flag) {
      const currentHooks = random <= 3 ? getRainCanvas : getSakuraCanvas;
      document.querySelector('canvas') && currentHooks();
    } else {
      (document.querySelector('canvas')!)?.remove();
    }
  }
}
