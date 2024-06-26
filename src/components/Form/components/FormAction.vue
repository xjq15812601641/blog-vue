<template>
  <a-col v-bind="actionColOpt" v-if="showActionButtonGroup">
    <div style="width: 100%" :style="{ textAlign: actionColOpt.style.textAlign }">
      <FormItem>
        <slot name="resetBefore"></slot>
        <Button
          type="default"
          class="mr-2"
          v-bind="getResetBtnOptions"
          @click="resetAction"
          v-if="showResetButton"
        >
          {{ getResetBtnOptions.text }}
        </Button>
        <slot name="submitBefore"></slot>

        <Button
          type="primary"
          class="mr-2"
          v-bind="getSubmitBtnOptions"
          @click="submitAction"
          v-if="showSubmitButton"
        >
          {{ getSubmitBtnOptions.text }}
        </Button>

        <slot name="advanceBefore"></slot>
        <Button
          type="link"
          size="small"
          @click="toggleAdvanced"
          v-if="showAdvancedButton && !hideAdvanceBtn"
        >
          {{ isAdvanced ? '收起' : '展开' }}
          <BasicArrow class="ml-1" :expand="!isAdvanced" up />
        </Button>
        <slot name="advanceAfter"></slot>
      </FormItem>
    </div>
  </a-col>
</template>
<script lang="ts">
  import { defineComponent, computed, PropType } from 'vue';
  import { Form, Col } from 'ant-design-vue';
  import { FormContextProps } from "/@/modules/component-module/form-module/interface/FormContextProps";
  import { form_key } from "/@/modules/component-module/form-module/variable/formVariable";
  import { BasicArrow } from "/@/modules/component-module/basic-module/variable/basicVariable";
  import { propTypes } from "/@/utils/propType/propTypes";
  import { ColEx } from "/@/modules/component-module/form-module/interface/ColEx";
  import { ButtonProps, BasicButton as Button } from "/@/modules/component-module/button-module/variable/buttonVariable";
  import { useContext } from "/@/modules/blogComp-module/method/useContext";

  type ButtonOptions = Partial<ButtonProps> & { text: string };

  export default defineComponent({
    name: 'BasicFormAction',
    components: {
      FormItem: Form.Item,
      Button,
      BasicArrow,
      [Col.name]: Col,
    },
    props: {
      showActionButtonGroup: propTypes.bool.def(true),
      showResetButton: propTypes.bool.def(true),
      showSubmitButton: propTypes.bool.def(true),
      showAdvancedButton: propTypes.bool.def(true),
      resetButtonOptions: {
        type: Object as PropType<ButtonOptions>,
        default: () => ({}),
      },
      submitButtonOptions: {
        type: Object as PropType<ButtonOptions>,
        default: () => ({}),
      },
      actionColOptions: {
        type: Object as PropType<Partial<ColEx>>,
        default: () => ({}),
      },
      actionSpan: propTypes.number.def(6),
      isAdvanced: propTypes.bool,
      hideAdvanceBtn: propTypes.bool,
    },
    emits: ['toggle-advanced'],
    setup(props, { emit }) {
      const actionColOpt = computed(() => {
        const { showAdvancedButton, actionSpan: span, actionColOptions } = props;
        const actionSpan = 24 - span;
        const advancedSpanObj = showAdvancedButton
          ? { span: actionSpan < 6 ? 24 : actionSpan }
          : {};
        const actionColOpt: Partial<ColEx> = {
          style: { textAlign: 'right' },
          span: showAdvancedButton ? 6 : 4,
          ...advancedSpanObj,
          ...actionColOptions,
        };
        return actionColOpt;
      });

      const getResetBtnOptions = computed((): ButtonOptions => {
        return Object.assign(
          {
            text: '重置',
          },
          props.resetButtonOptions,
        );
      });

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            text: '查询',
          },
          props.submitButtonOptions,
        );
      });

      function toggleAdvanced() {
        emit('toggle-advanced');
      }

      return {
        actionColOpt,
        getResetBtnOptions,
        getSubmitBtnOptions,
        toggleAdvanced,
        ...useContext<FormContextProps>(form_key),
      };
    },
  });
</script>
