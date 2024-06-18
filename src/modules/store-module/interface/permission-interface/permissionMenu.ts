import { RoleEnum } from '/@/enums/roleEnum';
import { RouteMeta } from 'vue-router';
import { BlogMenuTag } from '/@/modules/store-module/interface/permission-interface/permissionMenuTap';

export interface PermissionMenu {
  name: string;

  icon?: string;

  path: string;

  // path contains param, auto assignment.
  paramPath?: string;

  disabled?: boolean;

  children?: PermissionMenu[];

  orderNo?: number;

  roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;

  tag?: BlogMenuTag;

  hideMenu?: boolean;
}
