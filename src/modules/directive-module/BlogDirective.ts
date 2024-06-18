import { App } from 'vue';
import { authDirective } from '/@/modules/directive-module/method/getPermissionDirective';
import { loadingDirective } from '/@/modules/directive-module/method/getLoadingDirective';

export class BlogDirective {
  static setupPermissionDirective(app: App) {
    app.directive('auth', authDirective);
  }
  static setupLoadingDirective(app: App) {
    app.directive('loading', loadingDirective);
  }
}
