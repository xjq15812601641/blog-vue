import { createApp } from 'vue';
// Windi CSS框架的基础样式和组件
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
// 自定义样式
import '/@/design/index.less';
// 导入SVG图标库
import 'virtual:svg-icons-register';
import App from './App.vue';
import { initStore } from '/@/utils/initialize/initStore';
import { initAppConfig } from '/@/utils/initialize/initAppConfig';
import { initGlobComponents } from '/@/utils/initialize/initGlobComponents';
import { initRouter } from '/@/utils/initialize/initRouter';
import { initGlobDirectives } from '/@/utils/initialize/initGlobDirectives';
import { initRouterGuard } from "/@/utils/initialize/initRouterGuard";


async function bootstrap() {

  const app = createApp(App);
  initStore(app);
  initAppConfig();
  initGlobComponents(app);
  initRouter(app);
  initRouterGuard()
  initGlobDirectives(app);
  app.mount('#app');
}
bootstrap();
