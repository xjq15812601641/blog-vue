<!--<template>：这是一个Vue组件模板的部分。它包含了要渲染的HTML结构。-->
<template>
  <!--  导航栏启动器-->
  <AppProvider>
    <!-- 打开首页。-->
    <RouterView />
  </AppProvider>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { AppProvider } from '/@/modules/component-module/application-module/variable/applicationVariable';
  import { BlogThemeStore, BlogResponseStore } from "/@/modules/store-module/variable/storeVariable";

  const themeMap = ref({});
  const responseTime = ref(0);
  const startTime = performance.now();
  axios.defaults.baseURL = 'http://139.159.216.140:9076';
  axios
    .get('/blog/wallpaper/findAll')
    .then((response) => {
      response.data.forEach((item) => {
        themeMap.value[item.name] = item.url;
      });
      BlogThemeStore.setThemeMap(themeMap);
    })
    .catch((error) => {
      console.error('Failed to fetch wallpapers:', error);
    });
  const endTime = performance.now();
  const result = endTime - startTime;
  const response = result.toFixed(2);
  responseTime.value = Number(response);
  BlogResponseStore.setTime(responseTime);
</script>
