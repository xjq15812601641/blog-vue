<template>
  <Dropdown placement="bottomLeft" :overlayClassName="`${prefixCls}-dropdown-overlay`">
    <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
      <img :class="`${prefixCls}__header`" src="https://www.freeimg.cn/i/2024/01/31/65ba39b262323.png" @error="handleImg" />
      <span :class="`${prefixCls}__info hidden md:block`">
        <span :class="`${prefixCls}__name  `" class="truncate">
          {{ getUserInfo.username }}
        </span>
      </span>
    </span>

    <template #overlay>
      <Menu @click="handleMenuClick">
        <MenuItem key="profile" text="个人中心" icon="codicon:account" />
        <MenuItem key="logout" text="退出" icon="ion:power-outline" />
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts" setup name="UserDropdown">
  // components
  import { Dropdown, Menu } from 'ant-design-vue';
  import { computed } from 'vue';
  import { useImgLoadError } from "/@/views/common/hooks/useImgLoadError";
  import { useGo } from "/@/modules/blogComp-module/method/useGo";
  import { createAsyncComponent } from "/@/modules/component-module/layout-module/method/header/createAsyncComponent";
  import { propTypes } from "/@/utils/propType/propTypes";
  import { useDesign } from "/@/modules/blogComp-module/method/useDesign";
  import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
  const { handleImg } = useImgLoadError();

  type MenuEvent = 'logout' | 'profile';
  const go = useGo();

  const MenuItem = createAsyncComponent(() => import('./DropMenuItem.vue'));

  defineProps({
    theme: propTypes.oneOf(['dark', 'light']),
  });
  const { prefixCls } = useDesign('header-user-dropdown');
  const userStore = BlogUserStore;

  const getUserInfo = computed(() => {
    const { username = '', id } = userStore.getUserInfo || {};
    return { username, id };
  });

  async function handleMenuClick(e: { key: MenuEvent }) {
    switch (e.key) {
      case 'logout':
        await userStore.logout();
        break;
      case 'profile':
        await go('/profile/index');
        break;
    }
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-header-user-dropdown';

  .@{prefix-cls} {
    height: @header-height;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
      object-fit: cover;
    }

    &__header {
      border-radius: 50%;
    }

    &__name {
      font-size: 14px;
    }

    &--dark {
      &:hover {
        background-color: transparent;
      }
    }

    &--light {
      &:hover {
        background-color: @header-light-bg-hover-color;
      }

      .@{prefix-cls}__name {
        color: @text-color-base;
      }

      .@{prefix-cls}__desc {
        color: @header-light-desc-color;
      }
    }

    &-dropdown-overlay {
      .ant-dropdown-menu-item {
        min-width: 160px;
        color: rgba(255, 255, 255, 0.65);
      }
    }
  }
</style>
