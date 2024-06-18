<script lang="ts">
  import { computed, defineComponent, unref, h } from 'vue';
  import { omit } from 'lodash-es';
  import BasicButton from '/@/components/Button/BasicButton.vue';
  import { Popconfirm } from 'ant-design-vue';
  import { extendSlots } from '/@/utils/BlogUtils';
  import { popButtonProps } from "/@/modules/component-module/button-module/variable/buttonProps";
  import { getAttribute } from "/@/modules/blogComp-module/method/getAttribute";

  export default defineComponent({
    name: 'PopButton',
    inheritAttrs: false,
    props: popButtonProps,
    setup(props, { slots }) {
      const popButtonBindValues = computed(() => {
        return Object.assign(
          {
            okText: '确定',
            cancelText: '取消',
          },
          { ...props, ...unref(getAttribute()) },
        );
      });

      return () => {
        const bindValues = omit(unref(popButtonBindValues), 'icon');
        const btnBind = omit(bindValues, 'title') as Recordable;
        if (btnBind.disabled) btnBind.color = '';
        const Button = h(BasicButton, btnBind, extendSlots(slots));

        // If it is not enabled, it is a normal button
        if (!props.enable) {
          return Button;
        }
        return h(Popconfirm, bindValues, { default: () => Button });
      };
    },
  });
</script>
