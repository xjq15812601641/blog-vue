<template>
  <ul :class="getClass">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    computed,
    onMounted,
    watchEffect,
    watch,
    nextTick,
    getCurrentInstance,
    provide,
  } from 'vue';
  import { SimpleRootMenuContextProps } from "/@/modules/component-module/simpleMenu-module/interface/SimpleRootMenuContextProps";
  import { simple_menu_key } from "/@/modules/component-module/simpleMenu-module/variable/simpleMenuVariable";
  import { menuProp } from "/@/modules/component-module/simpleMenu-module/variable/simpleMenuProps";
  import { Mitt } from "/@/utils/mitt/mitt";
import { createContext } from "/@/modules/blogComp-module/method/createContext";
import { SubMenuProvider } from "/@/modules/component-module/simpleMenu-module/interface/SubMenuProvider";
import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  export default defineComponent({
    name: 'Menu',
    props: menuProp,
    emits: ['select', 'open-change'],
    setup(props, { emit }) {
      const rootMenuEmitter = new Mitt();
      const instance = getCurrentInstance();

      const currentActiveName = ref<string | number>('');
      const openedNames = ref<string[]>([]);

      const { prefixCls } = useDesign('menu');

      const isRemoveAllPopup = ref(false);
      createContext<SimpleRootMenuContextProps>({
        rootMenuEmitter: rootMenuEmitter,
        activeName: currentActiveName,
      }, simple_menu_key, { readonly: false, native: true })

      const getClass = computed(() => {
        const { theme } = props;
        return [
          prefixCls,
          `${prefixCls}-${theme}`,
          `${prefixCls}-vertical`,
          {
            [`${prefixCls}-collapse`]: props.collapse,
          },
        ];
      });

      watchEffect(() => {
        openedNames.value = props.openNames;
      });

      watchEffect(() => {
        if (props.activeName) {
          currentActiveName.value = props.activeName;
        }
      });

      watch(
        () => props.openNames,
        () => {
          nextTick(() => {
            updateOpened();
          });
        },
      );

      function updateOpened() {
        rootMenuEmitter.emit('on-update-opened', openedNames.value);
      }

      function addSubMenu(name: string) {
        if (openedNames.value.includes(name)) return;
        openedNames.value.push(name);
        updateOpened();
      }

      function removeSubMenu(name: string) {
        openedNames.value = openedNames.value.filter((item) => item !== name);
        updateOpened();
      }

      function removeAll() {
        openedNames.value = [];
        updateOpened();
      }

      function sliceIndex(index: number) {
        if (index === -1) return;
        openedNames.value = openedNames.value.slice(0, index + 1);
        updateOpened();
      }

      provide<SubMenuProvider>(`subMenu:${instance?.uid}`, {
        addSubMenu,
        removeSubMenu,
        getOpenNames: () => openedNames.value,
        removeAll,
        isRemoveAllPopup,
        sliceIndex,
        level: 0,
        props: props as any,
      });

      onMounted(() => {
        openedNames.value = !props.collapse ? [...props.openNames] : [];
        updateOpened();
        rootMenuEmitter.on('on-menu-item-select', (name: string) => {
          currentActiveName.value = name;

          nextTick(() => {
            props.collapse && removeAll();
          });
          emit('select', name);
        });

        rootMenuEmitter.on('open-name-change', ({ name, opened }) => {
          if (opened && !openedNames.value.includes(name)) {
            openedNames.value.push(name);
          } else if (!opened) {
            const index = openedNames.value.findIndex((item) => item === name);
            index !== -1 && openedNames.value.splice(index, 1);
          }
        });
      });

      return { getClass, openedNames };
    },
  });
</script>
<style lang="less">
  @import 'menu.less';
</style>
