import { SizeEnum } from '/@/enums/sizeEnum';

export interface LoadingProp {
  tip: string;
  size: SizeEnum;
  absolute: boolean;
  loading: boolean;
  background: string;
  theme: 'dark' | 'light';
}
