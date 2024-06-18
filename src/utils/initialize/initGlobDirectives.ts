import { App } from 'vue';
import { BlogDirective } from '/@/modules/directive-module/BlogDirective';

export function initGlobDirectives(app: App) {
  BlogDirective.setupPermissionDirective(app);
  BlogDirective.setupLoadingDirective(app);
}
