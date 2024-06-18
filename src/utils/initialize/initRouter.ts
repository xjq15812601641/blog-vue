import { BlogRouter } from '/@/modules/router-module/BlogRouter';
import { App } from 'vue';

export function initRouter(app: App) {
  BlogRouter.setupRouter(app);
}
