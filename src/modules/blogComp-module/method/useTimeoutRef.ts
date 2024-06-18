import { ref } from "vue";
import { tryOnUnmounted } from "@vueuse/shared";

export function useTimeoutRef(wait: number) {
  const readyRef = ref(false);

  let timer: TimeoutHandle;
  function stop(): void {
    readyRef.value = false;
    timer && window.clearTimeout(timer);
  }
  function start(): void {
    stop();
    timer = setTimeout(() => {
      readyRef.value = true;
    }, wait);
  }

  start();

  tryOnUnmounted(stop);

  return { readyRef, stop, start };
}
