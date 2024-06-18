export interface ContextMenuItem {
  label: string;
  icon?: string;
  disabled?: boolean;
  handler?: Fn;
  divider?: boolean;
  children?: ContextMenuItem[];
}
