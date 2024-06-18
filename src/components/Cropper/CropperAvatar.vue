<template>
  <div :class="getClass" :style="getStyle">
    <div :class="`${prefixCls}-image-wrapper`" :style="getImageWrapperStyle" @click="openModal">
      <div :class="`${prefixCls}-image-mask`" :style="getImageWrapperStyle">
        <Icon
          icon="ant-design:cloud-upload-outlined"
          :size="getIconWidth"
          :style="getImageWrapperStyle"
          color="#d6d6d6"
        />
      </div>
      <img :src="sourceValue" v-if="sourceValue" alt="avatar" />
    </div>
    <a-button
      :class="`${prefixCls}-upload-btn`"
      @click="openModal"
      v-if="showBtn"
      v-bind="btnProps"
    >
      {{ btnText ? btnText : '选择图片' }}
    </a-button>

    <CopperModal
      @register="register"
      @upload-success="handleUploadSuccess"
      @set-preview="handleSetPreview"
      ref="CopperModalRef"
      :uploadApi="uploadApi"
      :src="sourceValue"
    />
  </div>
</template>
<script lang="ts" name="CropperAvatar" setup>
  import { computed, CSSProperties, unref, ref, watchEffect, watch } from 'vue';
  import CopperModal from './CopperModal.vue';
  import {
    CropperAvatarProp
  } from "/@/modules/component-module/cropper-module/variable/cropperProps";
  import { useModal } from "/@/modules/component-module/modal-module/method/modal";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";


  const { prefixCls } = useDesign('cropper-avatar');
  const CopperModalRef = ref();
  const props = defineProps(CropperAvatarProp);

  const emit = defineEmits(['update:value', 'change']);

  const sourceValue = ref(props.value || '');
  const [register, { openModal, closeModal }] = useModal();
  const getClass = computed(() => [prefixCls]);
  const getWidth = computed(() => `${props.width}`.replace(/px/, '') + 'px');
  const getIconWidth = computed(() => parseInt(`${props.width}`.replace(/px/, '')) / 2 + 'px');
  const getStyle = computed((): CSSProperties => ({ width: unref(getWidth) }));
  const getImageWrapperStyle = computed(
    (): CSSProperties => ({ width: unref(getWidth), height: unref(getWidth) }),
  );

  watchEffect(() => {
    sourceValue.value = props.value || '';
  });

  watch(
    () => sourceValue.value,
    (v: string) => {
      emit('update:value', v);
    },
  );

  function handleUploadSuccess({ source, data }) {
    sourceValue.value = source;
    emit('change', { source, data: data.data, typeStr: props.type });
  }

  const handleSetPreview = (source) => {
    sourceValue.value = source;
  };

  const doUpload = async () => {
    return await CopperModalRef.value.doUpload();
  };

  defineExpose({ openModal: openModal.bind(null, true), closeModal, doUpload });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-cropper-avatar';

  .@{prefix-cls} {
    display: inline-block;
    text-align: center;

    &-image-wrapper {
      overflow: hidden;
      cursor: pointer;
      background: @component-background;
      border: 1px solid @border-color-base;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }

    &-image-mask {
      opacity: 0%;
      position: absolute;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      border: inherit;
      background: rgb(0 0 0 / 40%);
      cursor: pointer;
      transition: opacity 0.4s;

      ::v-deep(svg) {
        margin: auto;
      }
    }

    &-image-mask:hover {
      opacity: 4000%;
    }

    &-upload-btn {
      margin: 10px auto;
    }
  }
</style>
