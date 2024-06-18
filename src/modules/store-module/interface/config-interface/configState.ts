import { ConfigMiniState } from '/@/modules/store-module/interface/config-interface/configMiniState';
import { ConfigOption } from '/@/modules/config-moudle/interface/configOption';

export interface ConfigState {
  pageLoading: boolean;
  appConfig: ConfigOption | null;
  beforeMiniInfo: ConfigMiniState;
}
