import { Ref } from "vue";

export interface IntersectionObserverProps {
  target: Ref<Element | null | undefined>;
  root?: Ref<any>;
  onIntersect: IntersectionObserverCallback;
  rootMargin?: string;
  threshold?: number;
}
