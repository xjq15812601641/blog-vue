import { App } from 'vue';
import { store } from '/@/modules/store-module/variable/storeVariable';

export function initStore(app: App<Element>) {
  app.use(store);
}
