<template>
  <span class="thumb">
    <Image v-if="fileUrl" :src="fileUrl" :width="104" />
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Image } from 'ant-design-vue';
  import { ThumbUrlProps } from "/@/modules/component-module/modal-module/variable/modalProps";

  export default defineComponent({
    components: { Image },
    props: ThumbUrlProps,
  });
</script>
<style lang="less">
  .thumb {
    img {
      position: static;
      display: block;
      cursor: zoom-in;
      border-radius: 4px;
      object-fit: cover;
    }
  }
</style>
