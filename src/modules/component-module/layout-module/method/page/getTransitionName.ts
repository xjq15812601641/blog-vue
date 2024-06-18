import { DefaultContext } from "/@/components/layouts/page/transition";

export function getTransitionName({
                                    route,
                                    enableTransition,
                                    def,
                                  }: Pick<DefaultContext, 'route'> & {
  enableTransition: boolean;
  openCache: boolean;
  def: string;
}): string | undefined {
  if (!enableTransition) {
    return undefined;
  }

  const transitionName = 'fade-slide';
  const name: string | undefined = transitionName;

  return name || (route.meta.transitionName as string) || def;
}
