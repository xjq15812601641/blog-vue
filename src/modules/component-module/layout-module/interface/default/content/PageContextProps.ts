import { ComputedRef, Ref } from "vue";

export interface PageContextProps {
  contentHeight: ComputedRef<number>;
  pageHeight: Ref<number>;
  setPageHeight: (height: number) => Promise<void>;
}
