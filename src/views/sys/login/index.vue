<template>
  <div
    :style="{ backgroundImage: `url(${background})` }"
    class="w-full h-full flex justify-center items-center page-wrapper relative z-index-2">

    <!--头部设置-->
    <div class="w-full header-wrapper">
      <AppLogo :class="`site-logo`" />
      <div class="absolute right-4 set-icon">
        <SettingDrawer /><!--主题设置-->
      </div>
    </div>


    <div
      v-if="action === 'modify' || action === 'modifyPassword'"
      class="absolute flex justify-center items-center rounded w-80 h-135 form-box">
      <div class="w-full flex flex-col items-center">
        <!--当action为"modify"时，渲染一个VerifyEmail组件-->
        <VerifyEmail v-if="action === 'modify'" @modify="setAction" ref="verifyEmailRef" />
        <!--将currentEmail和currentPhone作为props传递给该组件-->
        <ModifyPassword
          v-if="action === 'modifyPassword'"
          @modify="setAction"
          :current-email="currentEmail"
          :current-phone="currentPhone"
        />
      </div>
    </div>


    <!--如果action不等于"modify"或"modifyPassword"，则渲染一个具有相对定位、圆角、背景颜色为白色并透明度为80%、宽度为80（在小屏幕上为160）、高度为110的容器。-->
    <div class="relative rounded bg-white/80 w-80 sm:w-160 h-110 container" v-else>
      <!--如果action等于"login"，则添加一个名为"left"的类；如果action等于"register"且getIsMobile为false，则添加一个名为"right"的类；否则不添加任何类-->
      <div
        class="absolute flex justify-center items-center -top-13 left-0 sm:left-5 rounded z-index-2 w-80 h-135 form-box"
        :class="action === 'login' ? 'left' : action === 'register' && !getIsMobile ? 'right' : ''"
      >
        <div class="w-full flex flex-col items-center">
          <RegisterForm v-if="action === 'register'" @login="setAction" />
          <LoginForm v-else @modify="setAction" />
        </div>
      </div>
      <!--同时，如果action的值为"login"或"register"且getIsMobile为false，则渲染该元素-->
      <div
        class="absolute w-1/2 flex flex-col justify-center items-center text-center con-box"
        :class="action === 'login' ? 'right' : 'left'"
        v-if="['login', 'register'].includes(action) && !getIsMobile"
      >
        <h2 class="font-bold text-2xl text-center mb-2 text-violet-400 tracking-widest">
          欢迎来到斯汪の博客
        </h2>
        <img
          src="https://www.freeimg.cn/i/2024/02/01/65ba8bfb35154.gif"
          alt=""
          class="w-63 h-30 my-10 mx-auto"
        />
        <!--显示desMap.tipStr的内容-->
        <p class="text-violet-400 text-xs tracking-wide text-center">{{ desMap.tipStr }}</p>
        <button @click="toggleAction" class="text-violet-300">{{ desMap.buttonStr }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import AppLogo from "/@/components/Application/AppLogo.vue";
  import LoginForm from './LoginForm.vue';
  import RegisterForm from './RegisterForm.vue';
  import VerifyEmail from './VerifyEmail.vue';
  import ModifyPassword from './ModifyPassword.vue';
  import { computed, ref } from 'vue';
  import SettingDrawer from '/@/components/layouts/default/setting/index.vue';
  import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";
  import { BlogConfigStore, BlogThemeStore } from "/@/modules/store-module/variable/storeVariable";


  /**
   * getIsMobile:根据这个布尔值来确定显示效果
   * appStore:用于为background设置背景
   * verifyEmailRef：判断是否显示为邮箱登录，
   * background：设置登录界面的背景
   */
  const { getIsMobile } = useAppInject();
  const appStore = BlogConfigStore;
  const useTheme = BlogThemeStore;
  const verifyEmailRef = ref();
  const background = computed(() => {
    const curImg = useTheme.getThemeMap[`${appStore.getAppConfig.background}`];
    return curImg;
  });


  /**
   * action:初始化一个login值
   * toggleAction：判断当前是登录还是注册来切换不同的显示效果
   * setAction：如果a为modifyPassword且VerifyComp不为空，获取isPhoneWay和formData属性
   */
  const currentEmail = ref('');
  const currentPhone = ref('');
  const action = ref('login');
  const toggleAction = () => {
    action.value = action.value === 'login' ? 'register' : 'login';
  };
  const setAction = (a: string) => {
    const VerifyComp = verifyEmailRef.value;
    if (a === 'modifyPassword' && VerifyComp) {
      const { isPhoneWay, formData } = VerifyComp;
      console.log('isPhoneWay formData===>', isPhoneWay, formData);
      isPhoneWay ? (currentPhone.value = formData.phone) : (currentEmail.value = formData.email);
    }
    action.value = a;
  };

  const desMap = computed(() => {
    return {
      buttonStr: action.value === 'login' ? '去注册' : '去登录',
      tipStr: action.value === 'login' ? '没有账号？' : '已有帐号',
    };
  });
</script>

<style lang="less" scoped>
  .site-logo {
    position: absolute;
    font-size: 14px;
    top: 14px;
    left: 0px;
    color: rgba(255, 255, 255);
  }

  .page-wrapper {
    //background: v-bind(background);
    background-size: cover;

    .header-wrapper {
      position: fixed;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 48px;
      top: 0;
      background-color: rgba(0, 0, 0, 0.4);

      .set-icon {
        line-height: 48px;
        cursor: pointer;
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }

  .container {
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  }

  .form-box {
    background: linear-gradient(
      to right,
      #b5eeba67,
      #756aee62,
      #df827881,
      #c77be780,
      #89ebe170,
      #e2e27d94
    );
    background-size: 500%;
    animation: gradual 17s linear infinite;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease-in-out;
  }

  .form-box.right {
    transform: translateX(80%);
  }

  .form-box.left {
    transform: translateX(0%);
  }

  .con-box {
    top: 50%;
    transform: translateY(-50%);
  }

  .con-box.left {
    left: -2%;
  }

  .con-box.right {
    right: -2%;
  }

  .con-box button {
    margin-top: 3%;
    background-color: #fff;
    border: 1px solid #d3b7d8;
    padding: 6px 10px;
    border-radius: 5px;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
  }

  .con-box button:hover {
    background-color: #d3b7d8;
    color: #fff;
  }

  .hidden {
    display: none;
    transition: all 0.5s;
  }
</style>
