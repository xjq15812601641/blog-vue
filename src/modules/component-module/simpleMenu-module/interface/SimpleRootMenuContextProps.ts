import { Ref } from "vue";
import { Emitter } from "/@/utils/mitt/interface/emitter";

export interface SimpleRootMenuContextProps {
  rootMenuEmitter: Emitter;
  activeName: Ref<string | number>;
}
