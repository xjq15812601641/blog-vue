<template>
  <a-input
    disabled
    :style="{ width }"
    placeholder="点击选择图标"
    :class="prefixCls"
    v-model:value="currentSelect"
  >
    <template #addonAfter>
      <a-popover
        placement="bottomLeft"
        trigger="click"
        v-model="visible"
        :overlayClassName="`${prefixCls}-popover`"
      >
        <template #title>
          <div class="flex justify-between">
            <a-input placeholder="搜索图标" @change="debounceHandleSearchChange" allowClear />
          </div>
        </template>

        <template #content>
          <div v-if="getPaginationList.length">
            <ScrollContainer class="border border-solid border-t-0">
              <ul class="flex flex-wrap px-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="p-2 w-1/8 cursor-pointer mr-1 mt-1 flex justify-center items-center border border-solid hover:border-primary"
                  @click="handleClick(icon)"
                  :title="icon"
                >
                  <!-- <Icon :icon="icon" :prefix="prefix" /> -->
                  <SvgIcon v-if="isSvgMode" :name="icon" />
                  <Icon :icon="icon" v-else />
                </li>
              </ul>
            </ScrollContainer>
            <div class="flex py-2 items-center justify-center" v-if="getTotal >= pageSize">
              <a-pagination
                showLessItems
                size="small"
                :pageSize="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else
            ><div class="p-5"><a-empty /></div>
          </template>
        </template>

        <span class="cursor-pointer px-2 py-1 flex items-center" v-if="isSvgMode && currentSelect">
          <SvgIcon :name="currentSelect" />
        </span>
        <Icon :icon="currentSelect || 'ion:apps-outline'" class="cursor-pointer px-2 py-1" v-else />
      </a-popover>
    </template>
  </a-input>
</template>
<script lang="ts" setup>
  import { ref, watchEffect, watch, unref } from 'vue';
  import { Input, Popover, Pagination, Empty } from 'ant-design-vue';
  import Icon from '/@/components/Icon/Icon.vue';
  import SvgIcon from '/@/components/Icon/SvgIcon.vue';
  import { useDebounceFn } from '@vueuse/core';
  import { IconComp } from '/@/modules/component-module/icon-module/iconComp';
  import { BlogClipboard } from "/@/modules/clipboard-module/blogClipboard";
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import { usePagination } from "/@/modules/component-module/icon-module/method/usePagination";
  import { iconPickerProps } from "/@/modules/component-module/icon-module/variable/iconProps";

  // 没有使用别名引入，是因为WebStorm当前版本还不能正确识别，会报unused警告
  const AInput = Input;
  const APopover = Popover;
  const APagination = Pagination;
  const AEmpty = Empty;

  const IconPickerProps = defineProps(iconPickerProps);
  const emit = defineEmits(['change', 'update:value']);
  const isSvgMode = IconPickerProps.mode === 'svg';
  const icons = isSvgMode ? IconComp.getSvgIcons() : IconComp.getIcons();

  const currentSelect = ref('');
  const visible = ref(false);
  const currentList = ref(icons);

  const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100);
  const { clipboardRef, isSuccessRef } = BlogClipboard.useCopyToClipboard(IconPickerProps.value);
  const { createMessage } = BlogMessage.useMessage();

  const { getPaginationList, getTotal, setCurrentPage } = usePagination(
    currentList,
    IconPickerProps.pageSize,
  );

  watchEffect(() => {
    currentSelect.value = IconPickerProps.value;
  });

  watch(
    () => currentSelect.value,
    (v) => {
      emit('update:value', v);
      return emit('change', v);
    },
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleClick(icon: string) {
    currentSelect.value = icon;
    if (IconPickerProps.copy) {
      clipboardRef.value = icon;
      if (unref(isSuccessRef)) {
        createMessage.success('复制图标成功');
      }
    }
  }

  function handleSearchChange(e: ChangeEvent) {
    const value = e.target.value;
    if (!value) {
      setCurrentPage(1);
      currentList.value = icons;
      return;
    }
    currentList.value = icons.filter((item) => item.includes(value));
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-icon-picker';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding: 0;
    }

    &-popover {
      width: 300px;

      .ant-popover-inner-content {
        padding: 0;
      }

      .scrollbar {
        height: 220px;
      }
    }
  }
</style>
