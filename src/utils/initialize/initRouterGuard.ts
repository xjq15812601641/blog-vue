import { BlogGuard } from '/@/modules/guard-moudle/BlogGuard';
import { router } from '/@/modules/router-module/variable/routerVariable';
import { BlogCache } from "/@/modules/cache-module/BlogCache";
import { ProjectKeyEnum } from "/@/enums/projectkeyEnum";

export function initRouterGuard() {
  BlogGuard.createPageGuard(router);
  BlogGuard.createStateGuard(router);
  (BlogCache.getCache(ProjectKeyEnum.token_key) as any) ? BlogGuard.createPermissionGuard(router) : BlogGuard.createParamMenuGuard(router);
}
