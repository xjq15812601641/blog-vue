import { LoadingProps } from '/@/modules/directive-module/interface/loadingProps';
import { createVNode, reactive, render, VNode } from 'vue';
import { defineComponent, h } from '@vue/runtime-core';
import { Loading } from "/@/modules/component-module/loading-module/variable/loadingVariable";

export function createLoading(props?: Partial<LoadingProps>, target?: HTMLElement, wait = false) {
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
