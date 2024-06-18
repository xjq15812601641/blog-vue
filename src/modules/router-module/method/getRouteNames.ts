import { WHITE_NAME_LIST } from "/@/modules/router-module/variable/routerVariable";

export function getRouteNames(array: any[]) {
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
};
