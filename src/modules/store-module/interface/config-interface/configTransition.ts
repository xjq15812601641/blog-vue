import { RouterTransitionModelEnum } from '/@/enums/routerTransitionModelEnum';

/**
 *过渡设置
 */
export interface ConfigTransition {
  //  Whether to open the page switching animation
  enable: boolean;
  // Route basic switching animation
  basicTransition: RouterTransitionModelEnum;
  // Whether to open page switching loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  openNProgress: boolean;
}
