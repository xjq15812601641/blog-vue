<template>
  <div ref="wrapRef"></div>
</template>
<script lang="ts">
  import type { Ref } from 'vue';
  import {
    defineComponent,
    ref,
    unref,
    nextTick,
    watch,
    onBeforeUnmount,
    onDeactivated,
  } from 'vue';
  import Vditor from 'vditor';
  import 'vditor/dist/index.css';
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import { useModalContext } from "/@/modules/component-module/table-module/method/modalContext/useModalContext";
  import { isProdMode } from "/@/utils/env/method/isProdMode";
  import { MarkdownProps } from "/@/modules/component-module/markdown-module/variable/markdownProps";
  import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
  import { onMountedOrActivated } from "/@/modules/component-module/markdown-module/method/onMountedOrActivated";

  export default defineComponent({
    inheritAttrs: false,
    props: MarkdownProps,
    emits: ['change', 'get', 'update:value'],
    setup(props, { attrs, emit }) {
      const wrapRef = ref<ElRef>(null);
      const vditorRef = ref(null) as Ref<Nullable<Vditor>>;
      const initedRef = ref(false);
      const { createMessage } = BlogMessage.useMessage();

      const modalFn = useModalContext();

      const valueRef = ref(props.value || '');

      watch(
        () => props.value,
        (v) => {
          if (v !== valueRef.value) {
            instance.getVditor()?.setValue(v);
          }
          valueRef.value = v;
        },
      );

      function init() {
        const wrapEl = unref(wrapRef) as HTMLElement;
        if (!wrapEl) return;
        const bindValue = { ...attrs, ...props };
        const insEditor = new Vditor(wrapEl, {
          // cdn: isProdMode()
          //   ? `${window.location.origin}/cdn/vditor`
          //   : 'https://unpkg.com/vditor@3.9.5',
          cdn: `/vditor`,
          theme: 'dark',
          lang: 'zh_CN',
          mode: 'sv',
          toolbarConfig: {
            hide: false,
          },
          fullscreen: {
            index: 820,
          },
          preview: {
            // mode: 'editor',
            hljs: {
              style: 'vim',
              lineNumber: true,
            },
            actions: [],
          },
          upload: {
            url: `${window.location.origin}/blog/api/v2/minio-client/upload`,
            multiple: false,
            fieldName: 'file',
            extraData: { type: 'article-content' },
            max: 2 * 1024 * 1024,
            success: successFn,
            error: errorFn,
            setHeaders: () => ({
              Authorization: BlogUserStore.getToken,
            }),
          },
          input: (v) => {
            valueRef.value = v;
            emit('update:value', v);
            emit('change', v);
          },
          after: () => {
            nextTick(() => {
              modalFn?.redoModalHeight?.();
              insEditor.setValue(valueRef.value);
              vditorRef.value = insEditor;
              initedRef.value = true;
              emit('get', instance);
            });
          },
          blur: () => {
            //unref(vditorRef)?.setValue(props.value);
          },
          ...bindValue,
          cache: {
            enable: false,
          },
        });
      }

      const successFn = (editor: HTMLPreElement, msg: string) => {
        const res = JSON.parse(msg);
        const str = `![](${
          isProdMode() ? window.location.origin : 'http://139.159.216.140:8081'
        }/img/static/article-content/${res.data.url})`;
        editor.innerHTML += str;
      };

      const errorFn = (msg: string) => {
        console.log('上传失败，');
        createMessage.error(`上传失败，${msg}`);
      };

      const instance = {
        getVditor: (): Vditor => vditorRef.value!,
      };

      function destroy() {
        const vditorInstance = unref(vditorRef);
        if (!vditorInstance) return;
        try {
          vditorInstance?.destroy?.();
        } catch (error) {}
        vditorRef.value = null;
        initedRef.value = false;
      }

      onMountedOrActivated(init);
      onBeforeUnmount(destroy);
      onDeactivated(destroy);
      return {
        wrapRef,
        ...instance,
      };
    },
  });
</script>
