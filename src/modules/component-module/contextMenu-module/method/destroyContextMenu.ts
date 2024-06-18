import { menuManager } from "/@/modules/component-module/contextMenu-module/method/menuManager";

export const destroyContextMenu = function () {
  if (menuManager) {
    menuManager.resolve('');
    menuManager.domList = [];
  }
};
