import { Ref, ref, unref } from "vue";
import { position } from "/@/modules/scroll-moduole/method/position";
import { isUnDef } from "/@/utils/is/is";
import { easeInOutQuad } from "/@/modules/scroll-moduole/method/easeInOutQuad";
import { move } from "/@/modules/scroll-moduole/method/move";
import { ScrollToParams } from "/@/modules/scroll-moduole/interface/scrollToParams";

export class Scroll {
  isActiveRef: Ref<boolean>;
  start: number;
  change: number;
  increment: number;
  currentTime: number;
  duration: number;
  el: HTMLElement


  constructor({ el, to, duration = 500 }: ScrollToParams) {
    this.el = el;
    this.isActiveRef = ref(false);
    this.start = position(el);
    this.change = to - this.start;
    this.increment = 20;
    this.currentTime = 0;
    this.duration = isUnDef(duration) ? 500 : duration;

  }
  animateScroll() {
    if (!unref(this.isActiveRef)) {
      return;
    }
    this.currentTime += this.increment;
    const val = easeInOutQuad(this.currentTime, this.start, this.change, this.duration);
    move(this.el, val);
    if (this.currentTime < this.duration && unref(this.isActiveRef)) {
      requestAnimationFrame(() => this.animateScroll());
    }
  };
  run() {
    this.isActiveRef.value = true;
    this.animateScroll();
  };
  stop() {
    this.isActiveRef.value = false;
  };

}
