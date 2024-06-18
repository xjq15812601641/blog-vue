import { App, Plugin } from "vue";

export function initComponent<T>(component: T) {
  const comp = component as any;
  comp.install = (app: App) => {
    app.component(comp.name ||comp.displayName, component);
  };
  return component as T & Plugin;
}
