<template>
  <Form
    v-bind="getBindValue"
    :class="getFormClass"
    ref="formElRef"
    :model="formModel"
    @keypress.enter="handleEnterPress"
  >
    <Row v-bind="getRow">
      <slot name="formHeader"></slot>
      <template v-for="schema in getSchema" :key="schema.field">
        <FormItem
          :tableAction="tableAction"
          :formActionType="formActionType"
          :schema="schema"
          :formProps="getProps"
          :allDefaultValues="defaultValueRef"
          :formModel="formModel"
          :setFormModel="setFormModel"
        >
          <template #[item]="data" v-for="item in Object.keys($slots)">
            <slot :name="item" v-bind="data || {}"></slot>
          </template>
        </FormItem>
      </template>

      <FormAction v-bind="getFormActionBindProps" @toggle-advanced="handleToggleAdvanced">
        <template
          #[item]="data"
          v-for="item in ['resetBefore', 'submitBefore', 'advanceBefore', 'advanceAfter']"
        >
          <slot :name="item" v-bind="data || {}"></slot>
        </template>
      </FormAction>
      <slot name="formFooter"></slot>
    </Row>
  </Form>
</template>
<script lang="ts">

  import type { Ref } from 'vue';

  import { defineComponent, reactive, ref, computed, unref, onMounted, watch, nextTick } from 'vue';
  import { Form, Row } from 'ant-design-vue';
  import FormItem from './components/FormItem.vue';
  import FormAction from './components/FormAction.vue';
  import { useDebounceFn } from '@vueuse/core';
  import { BasicFormProps } from "/@/modules/component-module/form-module/variable/formProps";
  import { dateItemType, form_key } from "/@/modules/component-module/form-module/variable/formVariable";
  import { useModalContext } from "/@/modules/component-module/table-module/method/modalContext/useModalContext";
  import { DateUtil } from "/@/utils/dateUtil/dateUtil";
  import { AdvanceState } from "/@/modules/component-module/form-module/interface/AdvanceState";
  import { FormProps } from "/@/modules/component-module/form-module/interface/FormProps";
  import { FormSchema } from "/@/modules/component-module/form-module/interface/FormSchema";
  import { FormActionType } from "/@/modules/component-module/form-module/interface/FormActionType";
  import { deepMerge } from "/@/utils/BlogUtils";
  import { FormContextProps } from "/@/modules/component-module/form-module/interface/FormContextProps";
  import { useFormValues } from "/@/modules/component-module/form-module/method/useFormValues";
  import { AutoFocus } from "/@/modules/component-module/form-module/method/AutoFocusContext";
  import { AdvancedContext } from "/@/modules/component-module/form-module/method/AdvancedContext";
  import { useFormEvents } from "/@/modules/component-module/form-module/method/useFormEvents";
  import { createContext } from "/@/modules/blogComp-module/method/createContext";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";

  export default defineComponent({
    name: 'BasicForm',
    components: { FormItem, Form, Row, FormAction },
    props: BasicFormProps,
    emits: ['advanced-change', 'reset', 'submit', 'register'],
    setup(props, { emit, attrs }) {
      const formModel = reactive<Recordable>({});
      const modalFn = useModalContext();

      const advanceState = reactive<AdvanceState>({
        isAdvanced: true,
        hideAdvanceBtn: false,
        isLoad: false,
        actionSpan: 6,
      });

      const defaultValueRef = ref<Recordable>({});
      const isInitedDefaultRef = ref(false);
      const propsRef = ref<Partial<FormProps>>({});
      const schemaRef = ref<Nullable<FormSchema[]>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);

      const { prefixCls } = useDesign('basic-form');;

      // Get the basic configuration of the form
      const getProps = computed((): FormProps => {
        return { ...props, ...unref(propsRef) } as FormProps;
      });

      const getFormClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--compact`]: unref(getProps).compact,
          },
        ];
      });

      // Get uniform row style and Row configuration for the entire form
      const getRow = computed((): Recordable => {
        const { baseRowStyle = {}, rowProps } = unref(getProps);
        return {
          style: baseRowStyle,
          ...rowProps,
        };
      });

      const getBindValue = computed(
        () => ({ ...attrs, ...props, ...unref(getProps) } as Recordable),
      );

      const getSchema = computed((): FormSchema[] => {
        const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
        for (const schema of schemas) {
          const { defaultValue, component } = schema;
          // handle date type
          if (defaultValue && dateItemType.includes(component)) {
            if (!Array.isArray(defaultValue)) {
              schema.defaultValue = DateUtil.getDateUtil(defaultValue);
            } else {
              const def: any[] = [];
              defaultValue.forEach((item) => {
                def.push(DateUtil.getDateUtil(item));
              });
              schema.defaultValue = def;
            }
          }
        }
        if (unref(getProps).showAdvancedButton) {
          return schemas.filter((schema) => schema.component !== 'Divider') as FormSchema[];
        } else {
          return schemas as FormSchema[];
        }
      });

      const { handleToggleAdvanced } = AdvancedContext({
        advanceState,
        emit,
        getProps,
        getSchema,
        formModel,
        defaultValueRef,
      });

      const { handleFormValues, initDefault } = useFormValues({
        getProps,
        defaultValueRef,
        getSchema,
        formModel,
      });

      AutoFocus({
        getSchema,
        getProps,
        isInitedDefault: isInitedDefaultRef,
        formElRef: formElRef as Ref<FormActionType>,
      });

      const {
        handleSubmit,
        setFieldsValue,
        clearValidate,
        validate,
        validateFields,
        getFieldsValue,
        updateSchema,
        resetSchema,
        appendSchemaByField,
        removeSchemaByFiled,
        resetFields,
        scrollToField,
      } = useFormEvents({
        emit,
        getProps,
        formModel,
        getSchema,
        defaultValueRef,
        formElRef: formElRef as Ref<FormActionType>,
        schemaRef: schemaRef as Ref<FormSchema[]>,
        handleFormValues,
      });
      createContext<FormContextProps>({
        resetAction: resetFields,
        submitAction: handleSubmit,
      }, form_key);

      watch(
        () => unref(getProps).model,
        () => {
          const { model } = unref(getProps);
          if (!model) return;
          setFieldsValue(model);
        },
        {
          immediate: true,
        },
      );

      watch(
        () => unref(getProps).schemas,
        (schemas) => {
          resetSchema(schemas ?? []);
        },
      );

      watch(
        () => getSchema.value,
        (schema) => {
          nextTick(() => {
            //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
            modalFn?.redoModalHeight?.();
          });
          if (unref(isInitedDefaultRef)) {
            return;
          }
          if (schema?.length) {
            initDefault();
            isInitedDefaultRef.value = true;
          }
        },
      );

      watch(
        () => formModel,
        useDebounceFn(() => {
          unref(getProps).submitOnChange && handleSubmit();
        }, 300),
        { deep: true },
      );

      async function setProps(formProps: Partial<FormProps>): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
      }

      function setFormModel(key: string, value: any) {
        formModel[key] = value;
        const { validateTrigger } = unref(getBindValue);
        if (!validateTrigger || validateTrigger === 'change') {
          validateFields([key]).catch((_) => {});
        }
      }

      function handleEnterPress(e: KeyboardEvent) {
        const { autoSubmitOnEnter } = unref(getProps);
        if (!autoSubmitOnEnter) return;
        if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
          const target: HTMLElement = e.target as HTMLElement;
          if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
            handleSubmit();
          }
        }
      }

      const formActionType: Partial<FormActionType> = {
        getFieldsValue,
        setFieldsValue,
        resetFields,
        updateSchema,
        resetSchema,
        setProps,
        removeSchemaByFiled,
        appendSchemaByField,
        clearValidate,
        validateFields,
        validate,
        submit: handleSubmit,
        scrollToField: scrollToField,
      };

      onMounted(() => {
        initDefault();
        emit('register', formActionType);
      });

      return {
        getBindValue,
        handleToggleAdvanced,
        handleEnterPress,
        formModel,
        defaultValueRef,
        advanceState,
        getRow,
        getProps,
        formElRef,
        getSchema,
        formActionType: formActionType as any,
        setFormModel,
        getFormClass,
        getFormActionBindProps: computed(
          (): Recordable => ({ ...getProps.value, ...advanceState }),
        ),
        ...formActionType,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-basic-form';

  .@{prefix-cls} {
    .ant-form-item {
      &-label label::after {
        margin: 0 6px 0 2px;
      }

      &-with-help {
        margin-bottom: 0;
      }

      &:not(.ant-form-item-with-help) {
        margin-bottom: 20px;
      }

      &.suffix-item {
        .ant-form-item-children {
          display: flex;
        }

        .ant-form-item-control {
          margin-top: 4px;
        }

        .suffix {
          display: inline-flex;
          padding-left: 6px;
          margin-top: 1px;
          line-height: 1;
          align-items: center;
        }
      }
    }

    .ant-form-explain {
      font-size: 14px;
    }

    &--compact {
      .ant-form-item {
        margin-bottom: 8px !important;
      }
    }
  }
</style>
