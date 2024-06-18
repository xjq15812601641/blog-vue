export interface BasicButtonProp {
  color?: string;
  loading?: boolean;
  disabled?: boolean;
  preIcon?: string;
  postIcon?: string;
  iconSize?: number;
  onClick?: PropType<(...args: any[]) => any>;
}
