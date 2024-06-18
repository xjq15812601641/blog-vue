<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition
        :name="
          getTransitionName({
            route,
            enableTransition: getEnableTransition,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </RouterView>
</template>

<script lang="ts" setup name="PageLayout">
  import { computed, unref } from 'vue';
  import { useRootSetting } from "/@/modules/component-module/layout-module/method/setting/rootSetting";
  import { useTransitionSetting } from "/@/modules/component-module/layout-module/method/setting/useTransitionSetting";
  import { getTransitionName } from "/@/modules/component-module/layout-module/method/page/getTransitionName";


  const { getOpenKeepAlive } = useRootSetting();
  const { getBasicTransition, getEnableTransition } = useTransitionSetting();
  const openCache = computed(() => unref(getOpenKeepAlive));
</script>
