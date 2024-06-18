<template>
  <Layout :class="prefixCls">
    <BackTop v-if="getUseOpenBackTop" :target="getTarget" /><!--回到顶部-->
    <LayoutHeader fixed v-if="getShowFullHeaderRef" /><!--折叠之后的显示效果-->
    <Layout :class="[layoutClass]">
      <LayoutSideBar v-if="getShowSidebar || getIsMobile" />
      <Layout :class="`${prefixCls}-main`" :style="{ backgroundImage: `url(${background})` }">
        <LayoutMultipleHeader />
        <LayoutContent />
        <div class="to-top" @click="goTop" ref="backToRef"></div>
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts" setup>
  import { computed, unref, ref, onUnmounted } from 'vue';
  import { Layout } from 'ant-design-vue';
  import { BackTop } from 'ant-design-vue';
  import LayoutHeader from './header/index.vue';
  import LayoutSideBar from './sider/index.vue';
  import LayoutMultipleHeader from './header/MultipleHeader.vue';
  import LayoutContent from './content/index.vue';
  import { useThrottleFn } from '@vueuse/shared';
  import { onMounted } from 'vue';
  import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";
  import { BlogConfigStore, BlogThemeStore } from "/@/modules/store-module/variable/storeVariable";
  import { Scroll } from "/@/modules/scroll-moduole/scroll";
  import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
  import { useHeaderSetting } from "/@/modules/component-module/layout-module/method/useHeaderSetting";
  import { useRootSetting } from "/@/modules/component-module/layout-module/method/setting/rootSetting";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";


  const { getIsMobile } = useAppInject();
  const background = computed(() => {
    const curImg = BlogThemeStore.getThemeMap[`${BlogConfigStore.getAppConfig.background}`];
    return curImg;
  });

  const backToRef = ref<HTMLElement | null>(null);

  onMounted(() => {
    window.addEventListener('scroll', useThrottleFn(showBackTop, 300), true);/*根据scroll绑定是一个滚动事件useThrottleFn*/
  });/*组件挂载到 DOM 后执行*/

  onUnmounted(() => {
    window.removeEventListener('scroll', showBackTop, true);
  });/*回调函数将在组件被卸载之前执行*/

  const showBackTop = (e) => {/*该函数接收一个参数 e，表示事件对象*/
    const target: any = e?.target;/*尝试获取事件对象 e 的目标元素。如果 e 为 null 或 undefined，那么整个表达式的结果将为 undefined，并且不会引发错误。*/
    const isTarget = target.className.includes(`sup-layout-content`);/*判断目标元素的类名是否包含 'sup-layout-content' */
    if (!isTarget || !backToRef.value) return;
    const scrollTop = target.scrollTop;/*获取目标元素的滚动位置*/
    const wHeight = document.documentElement.clientHeight;/*获取浏览器窗口的可视高度*/
    if (scrollTop > Math.floor(1.6 * wHeight)) {
      backToRef.value.style.display = 'block';
    } else {
      backToRef.value.style.display = 'none';
    }/*根据滚动位置判断是否显示或隐藏一个元素。*/
  };/*根据获取的元素的位置来判断是否显示该元素*/

  const goTop = () => {
    let index = 0;
    const el = document.querySelector('.to-top') as HTMLElement;
    if (!el) return;
    const timer = setInterval(() => {
      index++;
      el.style['background-position-x'] = -(143 * index + 40) + 'px';
      if (index == 4) {
        el.classList.add('transition', 'fly');
      }
      if (index == 6) {
        index = 0;
        clearInterval(timer);
        const initTimer = setTimeout(() => {
          el.classList.remove('transition', 'fly');
          el.style['background-position'] = '-40px -44px';
          clearTimeout(initTimer);
        }, 500);
        const target = document.querySelector('.sup-layout-content')!;
        const { run } = new Scroll({ el: target, to: 0, duration: 500 });
        run();
      }
    }, 120);
  };

  const layoutClass = computed(() => {
    let cls: string[] = ['ant-layout'];
    if (unref(getIsMixSidebar) || unref(getShowMenu)) {
      cls.push('ant-layout-has-sider');
    }
    return cls;
  });
  const { prefixCls } = useDesign('default-layout');
  const { getShowFullHeaderRef } = useHeaderSetting();
  const { getShowSidebar, getIsMixSidebar, getShowMenu } = useMenuSetting();
  const getTarget = () => document.body;
  const { getUseOpenBackTop } = useRootSetting();
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';

  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;

    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &-main {
      width: 100%;
      height: 100vh;
      overflow: auto;
      //background: v-bind(background);
      background-size: cover;
      // background-attachment: fixed;
    }
  }

  .to-top {
    position: fixed;
    z-index: 999;
    display: none;
    bottom: 100px;
    right: 20px;
    transform: translateY(0);
    width: 62px;
    height: 85px;
    margin-left: 602px;
    cursor: pointer;
    //background-image: url('/@/assets/images/space-to-top.png');
    background-position: -40px -44px;
  }

  .to-top.transition {
    transition: transform 0.3s ease-in;
  }

  .to-top.fly {
    transform: translateY(-1000px);
  }
</style>
