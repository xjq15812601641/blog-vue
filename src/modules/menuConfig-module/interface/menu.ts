import { RoleEnum } from "/@/enums/roleEnum";
import { RouteMeta } from "vue-router";
import { MenuTag } from "/@/modules/menuConfig-module/interface/menuTap";

export interface Menu {
  name: string;

  icon?: string;

  path: string;

  // path contains param, auto assignment.
  paramPath?: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;

  tag?: MenuTag;

  hideMenu?: boolean;
}
