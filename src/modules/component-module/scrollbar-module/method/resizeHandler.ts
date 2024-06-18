export function resizeHandler(entries: any[]) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach((fn: () => any) => {
        fn();
      });
    }
  }
}
