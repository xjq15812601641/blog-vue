import { LoadingProp } from "/@/modules/component-module/loading-module/interface/loadingProp";
import { createVNode, defineComponent, h, reactive, Ref, render, unref, VNode } from "vue";
import Loading from "/@/components/Loading/Loading.vue";
import {
  UseLoadingOptions
} from "/@/modules/component-module/loading-module/interface/useLoadingOptions";

export class LoadingComp {
  static useLoading(props: Partial<LoadingProp>): [Fn, Fn, (string) => void];
  static useLoading(opt: Partial<UseLoadingOptions>): [Fn, Fn, (string) => void];
  static useLoading(
    opt: Partial<LoadingProp> | Partial<UseLoadingOptions>,
  ): [Fn, Fn, (string) => void] {
    let props: Partial<LoadingProp>;
    let target: HTMLElement | Ref<ElRef> = document.body;

    if (Reflect.has(opt, 'target') || Reflect.has(opt, 'props')) {
      const options = opt as Partial<UseLoadingOptions>;
      props = options.props || {};
      target = options.target || document.body;
    } else {
      props = opt as Partial<LoadingProp>;
    }

    const instance = LoadingComp.createLoading(props, undefined, true);

    const open = (): void => {
      const t = unref(target as Ref<ElRef>);
      if (!t) return;
      instance.open(t);
    };

    const close = (): void => {
      instance.close();
    };

    const setTip = (tip: string) => {
      instance.setTip(tip);
    };

    return [open, close, setTip];
  }
  static createLoading(props?: Partial<LoadingProp>, target?: HTMLElement, wait = false) {
    let vm: Nullable<VNode> = null;
    const data = reactive({
      tip: '',
      loading: true,
      ...props,
    });

    const LoadingWrap = defineComponent({
      render() {
        return h(Loading, { ...data });
      },
    });

    vm = createVNode(LoadingWrap);

    if (wait) {
      // TODO fix https://github.com/anncwb/vue-vben-admin/issues/438
      setTimeout(() => {
        render(vm, document.createElement('div'));
      }, 0);
    } else {
      render(vm, document.createElement('div'));
    }

    function close() {
      if (vm?.el && vm.el.parentNode) {
        vm.el.parentNode.removeChild(vm.el);
      }
    }

    function open(target: HTMLElement = document.body) {
      if (!vm || !vm.el) {
        return;
      }
      target.appendChild(vm.el as HTMLElement);
    }

    if (target) {
      open(target);
    }
    return {
      vm,
      close,
      open,
      setTip: (tip: string) => {
        data.tip = tip;
      },
      setLoading: (loading: boolean) => {
        data.loading = loading;
      },
      get loading() {
        return data.loading;
      },
      get $el() {
        return vm?.el as HTMLElement;
      },
    };
  }
}
