<template>
  <Button v-bind="$attrs" :disabled="isStart" @click="handleStart" :loading="loading">
    {{ getButtonText }}
  </Button>
</template>
<script lang="ts">
  import { defineComponent, ref, watchEffect, computed, unref } from 'vue';
  import { Button } from 'ant-design-vue';
  import { countDownProp } from "/@/modules/component-module/countDown-module/variable/countDownProps";
  import { isFunction } from "/@/utils/is/is";
  import { useCountdown } from "/@/modules/component-module/countDown-module/method/useCountdown";

  export default defineComponent({
    name: 'CountButton',
    components: { Button },
    props: countDownProp,
    setup(props) {
      const loading = ref(false);

      const { currentCount, isStart, start, reset } = useCountdown(props.count);
      const getButtonText = computed(() => {
        return !unref(isStart) ? '获取验证码' : `${unref(currentCount)}秒后重新获取`;
      });

      watchEffect(() => {
        props.value === undefined && reset();
      });

      /**
       * @description: 执行前判断是否有外部功能，执行后决定是否启动
       */
      async function handleStart() {
        const { beforeStartFunc } = props;
        if (beforeStartFunc && isFunction(beforeStartFunc)) {
          loading.value = true;
          try {
            const canStart = await beforeStartFunc();
            canStart && start();
          } finally {
            loading.value = false;
          }
        } else {
          start();
        }
      }
      return { handleStart, currentCount, loading, getButtonText, isStart };
    },
  });
</script>
