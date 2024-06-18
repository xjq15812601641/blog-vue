<template>
  <h1>register</h1>
  <!--  “p-4” 的 CSS :用于设置内边距-->
  <!--  “enter-x” :处理在表单中按下回车键时触发事件-->
  <!--  formData:将表单数据存储在 formData 变量中-->
  <!--  getFormRules:是一个方法，用于返回表单验证规则的对象-->
  <!--  ref="formRef":给 <Form> 组件添加了一个引用ref，可以在组件中通过 $refs 来访问该引用-->
  <!--  keypress.enter:当在表单中按下回车键时，会触发名为 handleLogin 的方法-->
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    @keypress.enter="handleLogin"
  >
    <FormItem name="username" class="enter-x">
      <!--size="large"：设置输入框的尺寸为 "large"。-->
      <!--:readonly="getIsMobile ? false : true"：根据 getIsMobile 方法的返回true，则输入框为只读状态，否则为可编辑状态。-->
      <!--onfocus="this.removeAttribute('readonly')"：在输入框获得焦点时，移除 readonly 属性，使得输入框变为可编辑状态。-->
      <!--v-model:value.trim="formData.username"：与 formData.username 变量进行绑定，并通过 .trim 修饰符自动去除输入框的前后空格。-->
      <!--autocomplete="off"：禁用浏览器的自动填充功能。-->
      <!--@blur="verifyExist({ username: formData.username })"：当输入框失去焦点时，并将usernam作为参数传递给verifyExist-->
      <!--:maxlength="30"：设置输入框的最大字符数为 30。-->
      <Input
        size="large"
        :readonly="getIsMobile ? false : true"
        onfocus="this.removeAttribute('readonly')"
        v-model:value.trim="formData.username"
        autocomplete="off"
        placeholder="请输入用户名"
        class="fix-auto-fill"
        @blur="verifyExist({ username: formData.username })"
        :maxlength="30"
      />
    </FormItem>
    <FormItem name="email" class="enter-x" v-if="registerType === 'email'">
      <Input
        size="large"
        :readonly="getIsMobile ? false : true"
        onfocus="this.removeAttribute('readonly')"
        v-model:value.trim="formData.email"
        autocomplete="off"
        placeholder="请输入邮箱"
        class="fix-auto-fill"
        :maxlength="30"
      />
    </FormItem>
    <FormItem name="phone" class="enter-x" v-if="registerType === 'phone'">
      <Input
        size="large"
        :readonly="getIsMobile ? false : true"
        onfocus="this.removeAttribute('readonly')"
        v-model:value.trim="formData.phone"
        autocomplete="off"
        placeholder="请输入手机号"
        @input="handleInput"
        class="fix-auto-fill"
        :maxlength="11"
      />
    </FormItem>
    <FormItem name="code" class="enter-x">
      <!--输入时触发@input="handleInput"-->
      <Input
        :readonly="getIsMobile ? false : true"
        onfocus="this.removeAttribute('readonly')"
        size="large"
        v-model:value.trim="formData.code"
        @input="handleInput"
        autocomplete="off"
        placeholder="验证码"
        class="fix-auto-fill"
        :maxlength="6"
      />
      <!--  :disabled="!isAllowClick"：根据 isAllowClick 变量的值来动态设置元素的 disabled 按钮禁用状态和可用状态。-->
      <!--  @click="queryCode"：当按钮被点击时会调用名为 queryCode 的方法。-->
      <!--  {{ isAllowClick ? '获取验证码' :${CountDown}s之后重试}}：如果 isAllowClick 为真，则显示 "获取验证码"，否则显示 ${CountDown}s之后重试-->
      <button class="absolute px-2 right-0 bottom-4" :disabled="!isAllowClick" @click="queryCode">{{
        isAllowClick ? '获取验证码' : `${CountDown}s之后重试`
      }}</button>
    </FormItem>
    <FormItem name="password" class="enter-x">
      <!--new-password 是一个特殊的值，用于指示浏览器不应该自动填充密码字段的值。这样可以防止浏览器将之前保存的密码信息自动填充到该输入框中。-->
      <Input
        size="large"
        :readonly="getIsMobile ? false : true"
        onfocus="this.removeAttribute('readonly')"
        v-model:value.trim="formData.password"
        placeholder="请输入密码"
        autocomplete="new-password"
        class="fix-auto-fill"
        type="password"
        :maxlength="20"
      />
    </FormItem>

    <span @click="toggleRegisterType" class="text-violet-400 cursor-pointer">
      使用{{ registerDesc }}注册
    </span>

    <FormItem class="enter-x">
      <!--:loading="loading"：根据 loading 变量的值动态设置按钮的加载状态。如果 loading 为真，则按钮显示加载状态，否则显示正常状态。-->
      <Button size="large" block @click="handleLogin" :loading="loading" class="rounded-md mt-4">
        注册
      </Button>
    </FormItem>
  </Form>
  <!--v-if根据条件决定是否渲染元素-->
  <a href="javascript:;" @click="toLogin" class="ml-32 text-violet-400" v-if="getIsMobile"
    >去登录</a
  >
</template>
<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import { Form, Input, Button } from "ant-design-vue";
  import { useFormRules, useFormValid } from './useRegister';
  import { userRegister, verfiy, createCode } from '/@/api/user';
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";

  const FormItem = Form.Item;
  const { createMessage, notification } = BlogMessage.useMessage();

  const canQueryCode = ref(false); // 是否可以发送验证码

  const { getFormRules } = useFormRules();

  const emit = defineEmits(['login']);

  const registerType = ref('phone');

  //toggleRegisterType,registerDesc切换注册方式和显示UI
  const toggleRegisterType = () => {
    formData.email = '';
    formData.phone = '';
    registerType.value = registerType.value === 'phone' ? 'email' : 'phone';
  };
  const registerDesc = computed(() => (registerType.value === 'email' ? '手机号' : '邮箱'));

  const toLogin = () => {
    emit('login', 'login');
  };

  /* 只能输入数字 */
  const handleInput = () => {
    formData.code = formData.code.replace(/[^\d]/g, '');
    if (registerType.value === 'phone') {
      formData.phone = formData.phone.replace(/[^\d]/g, '');
    }
  };
  const isAllowClick = ref(true);

  const verifyExist = async (obj) => {
    const { username, email, phone } = obj;
    if (username) {
      if (!/^([\u4e00-\u9fa5a-z0-9])+$/gi.test(username)) {
        return createMessage.error('至少包含中英文、数字中的两种');
      }
      const message = await verfiy('username', obj);
      if (message === 'success') {
        notification.success({
          message: '验证成功',
          description: `用户名可用`,
          duration: 1,
        });
      } else {
        notification.error({
          message: '验证失败',
          description: `用户名已被注册`,
          duration: 1,
        });
      }
      }
    if (email || phone) {
      if (toValidate()) return;
      try {
        const message = await verfiy(email ? 'email' : 'phone', obj);
        if (message === 'success') {
          canQueryCode.value = true;
          notification.success({
            message: '验证成功',
            description: `手机号可用`,
            duration: 1,
          });
        } else {
          canQueryCode.value = false;
          notification.error({
            message: '验证失败',
            description: `手机号已被注册`,
            duration: 1,
          });
        }
      } catch (err) {
        canQueryCode.value = false;
      }
    }
  };

  const { getIsMobile } = useAppInject();
  const formRef = ref();
  const loading = ref(false);
  const CountDown = ref(60);
  const timer = ref<null | Number>(null);

  const formData = reactive({
    username: '',
    password: '',
    email: '',
    code: '',
    phone: '',
  });

  const { validForm } = useFormValid(formRef);

  const toValidate = (): Boolean => {
    if (registerType.value === 'email') {
      canQueryCode.value = false;
      if (!formData.email) {
        createMessage.error('请输入邮箱地址！');
        return true;
      }
      if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(formData.email)) {
        createMessage.error('请输入正确的邮箱地址！');
        return true;
      }
    } else if (registerType.value === 'phone') {
      canQueryCode.value = false;
      if (!formData.phone) {
        createMessage.error('请输入手机号！');
        return true;
      }
      if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
        createMessage.error('请输入正确的手机号！');
        return true;
      }
    }
    canQueryCode.value = true;
    return false;
  };

  const queryCode = async (e) => {
    e.preventDefault();
    if (toValidate()) return;
    const data =
      registerType.value === 'email' ? { email: formData.email } : { phone: formData.phone };
    await verifyExist(data);
    if (!canQueryCode.value) return;
    isAllowClick.value = false;
    startCountDown();
    await createCode(registerType.value === 'email' ? 'email' : 'phone', data);
  };

  /* 倒计时 */
  const startCountDown = () => {
    timer.value = window.setInterval(() => {
      if (CountDown.value === 0) {
        isAllowClick.value = true;
        window.clearInterval(timer.value as any);
        CountDown.value = 60;
        return;
      }
      CountDown.value = CountDown.value - 1;
    }, 1000);
  };

  async function handleLogin() {
    // 调用名为 validForm 的异步函数，获取表单数据，并将结果赋值给 data 变量。
    const data = await validForm();
    if (!data) return;
    try {
      // 将 loading 的值设置为 true，表示正在加载中。
      loading.value = true;
      // 传递一个包含表单数据的对象作为参数
      const message = await userRegister({
        username: data.username,
        password: data.password,
        phone: data.phone,
        email: data.email,
        code: data.code,
      });
      // 调用名为 createMessage 的函数，显示一个成功提示消息
      if (message === 'success'){
        notification.success({
          message: '注册成功',
          description: `用户： ${data.username} 已注册`,
          duration: 1,
        });
      } else {
        notification.error({
          message: '注册失败',
          description: `${message}`,
          duration: 1,
        });
      }
      createMessage.success(message);
      toLogin();
    } finally {
      // 表示加载完成
      loading.value = false;
    }
  }
</script>

<style lang="less" scoped>
  @import url('./form.less');
</style>
