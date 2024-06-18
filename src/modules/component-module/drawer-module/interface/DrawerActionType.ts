export interface DrawerActionType {
  scrollBottom: () => void;
  scrollTo: (to: number) => void;
  getScrollWrap: () => Element | null;
}
