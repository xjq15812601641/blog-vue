import {
  PageContextProps
} from "/@/modules/component-module/layout-module/interface/default/content/PageContextProps";
import { layout_key } from "/@/modules/component-module/layout-module/variable/layoutVariable";
import { createContext } from "/@/modules/blogComp-module/method/createContext";

export function createPageContext(context: PageContextProps) {
  return createContext<PageContextProps>(context, layout_key, { native: true });
}
