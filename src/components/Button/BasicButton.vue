<template>
  <Button
    v-bind="omit(BasicButtonBindValue, 'style', 'class')"
    :class="BasicButtonClass"
    @click="onClick"
  >
    <template #default="data">
      <Icon :icon="preIcon" v-if="preIcon" :size="iconSize" />
      <slot v-bind="data || {}"></slot>
      <Icon :icon="postIcon" v-if="postIcon" :size="iconSize" />
    </template>
  </Button>
</template>

<script lang="ts" setup name="AButton">
  import { Button } from 'ant-design-vue';
  import Icon from '/@/components/Icon/Icon.vue';
  import { omit } from 'lodash-es';
  import { basicButtonProps } from "/@/modules/component-module/button-module/variable/buttonProps";
  import { getAttribute } from "/@/modules/blogComp-module/method/getAttribute";
  import { computed, unref } from "vue";

  const props = defineProps(basicButtonProps);
  const BasicButtonClass = computed(() => {
    return [
      {
        [`ant-btn-${props.color}`]: !!props.color,
        [`is-disabled`]: props.disabled,
      },
    ];
  });
  const BasicButtonBindValue = computed(() => ({ ...unref(getAttribute({ excludeDefaultKeys: false })), ...props }));
</script>
