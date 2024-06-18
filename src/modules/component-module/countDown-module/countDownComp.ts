import { Ref, ref, unref } from "vue";
import { tryOnUnmounted } from '@vueuse/core';

export class CountDownComp {
  currentCount: Ref<number>;
  isStart: Ref<boolean>;
  timerId: ReturnType<typeof setInterval> | null;
  count: number;

  constructor(count) {
    this.currentCount = ref(count);
    this.isStart = ref(false);
    this.timerId = null;
    this.count = count;
    tryOnUnmounted(() => {
      this.reset();
    });
  }

  clear() {
    this.timerId && window.clearInterval(this.timerId);
  }

  stop() {
    this.isStart.value = false;
    this.clear();
    this.timerId = null;
  }

  start() {
    if (unref(this.isStart) || !!this.timerId) {
      return;
    }
    this.isStart.value = true;
    this.timerId = setInterval(() => {
      if (unref(this.currentCount) === 1) {
        stop();
        this.currentCount.value = this.count;
      } else {
        this.currentCount.value -= 1;
      }
    }, 1000);
  }

  reset() {
    this.currentCount.value = this.count;
    stop();
  }

  restart() {
    this.reset();
    this.start();
  }
}
