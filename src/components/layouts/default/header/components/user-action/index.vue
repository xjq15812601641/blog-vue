<template>
  <span @click="doAction('/login')" class="text-light-80 hover:text-white mx-1 cursor-pointer">
    登录
  </span>
</template>

<script lang="ts" setup>
  import { useGo } from "/@/modules/blogComp-module/method/useGo";

  const go = useGo();
  const doAction = (path: string) => {
    go(path);
  };
</script>
