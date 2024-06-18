import { ComputedRef } from 'vue';
import { ScreenEnum } from '/@/enums/screenEnum';
import { YardageEnum } from '/@/enums/yardageEnum';

export interface CreateCallbackParams {
  screen: ComputedRef<YardageEnum | undefined>;
  width: ComputedRef<number>;
  realWidth: ComputedRef<number>;
  screenEnum: typeof ScreenEnum;
  yardageEnum: typeof YardageEnum;
}
