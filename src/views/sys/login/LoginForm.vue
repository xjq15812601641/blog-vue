<template>
  <h1>登录</h1>
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    @keypress.enter="handleLogin"
  >
    <FormItem name="username" class="enter-x">
      <!--设置输入框的尺寸为"large"；根据条件判断是否设置输入框为只读模式；当输入框获得焦点时，通过onfocus事件移除readonly属性；使用v-model指令将输入框的值与formData.username进行双向绑定；禁用输入框的自动填充功能；添加一个名为"fix-auto-fill"的类；设置输入框的最大输入长度为30个字符。-->
      <Input
        size="large"
        :readonly="getIsMobile ? false : true"
        onfocus="this.removeAttribute('readonly')"
        v-model:value.trim="formData.username"
        placeholder="USERNAME"
        autocomplete="off"
        class="fix-auto-fill"
        :maxlength="30"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <Input
        :readonly="getIsMobile ? false : true"
        onfocus="this.removeAttribute('readonly')"
        autocomplete="new-password"
        size="large"
        v-model:value.trim="formData.password"
        placeholder="PASSWORD"
        class="fix-auto-fill"
        type="password"
        :maxlength="20"
      />
    </FormItem>

    <FormItem class="enter-x">
      <Button size="large" block @click="handleLogin" :loading="loading" class="rounded-md mt-4">
        LOGIN
      </Button>
    </FormItem>
  </Form>

  <div class="w-full px-10 flex justify-between">
    <div
      @click="modifyAction('register')"
      class="text-violet-400 cursor-pointer"
      v-if="getIsMobile"
    >
      去注册！
    </div>
    <div @click="modifyAction('modify')" class="text-violet-400 cursor-pointer"> 忘记密码？ </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import { useFormRules, useFormValid } from './useLogin';
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
  import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";


  const FormItem = Form.Item;
  const { notification } = BlogMessage.useMessage();
  const userStore = BlogUserStore;
  const emit = defineEmits(['modify']);

  const modifyAction = (payload) => {
    emit('modify', payload);
  };

  const { getIsMobile } = useAppInject();
  const { getFormRules } = useFormRules();

  const formRef = ref();
  const loading = ref(false);

  const formData = reactive({
    username: '',
    password: '',
  });

  const { validForm } = useFormValid(formRef);

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.login({
        password: data.password,
        username: data.username,
      });
      if (userInfo) {
        notification.success({
          message: '登录成功',
          description: `欢迎： ${userInfo.username}`,
          duration: 1,
        });
      }
    } finally {
      loading.value = false;
    }
  }
</script>

<style lang="less" scoped>
  @import url('./form.less');
</style>
