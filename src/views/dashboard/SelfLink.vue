<template>
  <div
    class="md:w-full px-10 h-20 py-6 relative z-index-2 flex mx-auto justify-around rounded link-box"
  >
    <Tooltip title="QQ" placement="bottom">
      <template #default>
        <Icon
          icon="cib:tencent-qq"
          :size="30"
          class="cursor-pointer qq"
          @mouseenter="showQR('qq-img')"
          @mouseleave="showQR('')"
        />
      </template>
    </Tooltip>
    <Tooltip title="BiliBili" placement="bottom">
      <template #default>
        <Icon
          icon="ri:bilibili-line"
          :size="30"
          class="cursor-pointer BiliBili"
          @mouseenter="showQR('BiliBili-img')"
          @mouseleave="showQR('')"
          @click="toExternalLink('BiliBili')"
        />
      </template>
    </Tooltip>
    <Tooltip title="wechat" placement="bottom">
      <template #default>
        <Icon
          icon="ic:baseline-wechat"
          :size="30"
          class="cursor-pointer wechat"
          @mouseenter="showQR('wechat-img')"
          @mouseleave="showQR('')"
        />
      </template>
    </Tooltip>
    <Tooltip title="github" placement="top">
      <template #default>
        <Icon
          icon="simple-icons:github"
          :size="30"
          class="cursor-pointer github"
          @click="toExternalLink('github')"
        />
      </template>
    </Tooltip>
  </div>
  <div
    class="link-img justify-center absolute hidden items-center bg-dark-700/50"
    :class="currentTip"
  >
    <img :src="currentQR" alt="" class="" />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Icon from '/@/components/Icon/Icon.vue';
  import { Tooltip } from 'ant-design-vue';
  const currentTip = ref('');

  const toExternalLink = (key: string) => {
    const externalLinkMap = {
      BiliBili: 'https://space.bilibili.com/616054475',
      gitea: 'https://git.shizuka.icu/ajuna/blog2.0.git',
      github: 'https://github.com/MSshizuka/blog2.0',
    };
    window.open(externalLinkMap[key], '_blank');
  };

  const showQR = (key: string) => {
    currentTip.value = key;
  };

  const QRMap = {
    'qq-img': 'https://www.freeimg.cn/i/2024/01/31/65ba39b221664.png',
    'wechat-img': 'https://www.freeimg.cn/i/2024/01/31/65ba39b224228.png',
    'BiliBili-img': 'https://www.freeimg.cn/i/2024/02/29/65df9cad27244.png',
  };

  const currentQR = computed(() => QRMap[currentTip.value]);
</script>

<style lang="less" scoped>
  .link-box {
    .qq:hover {
      color: #e53333;
    }

    .BiliBili:hover {
      color: #00a1d7;
    }

    .wechat:hover {
      color: #1fd86d;
    }

    .github:hover {
      color: #5a2d7e;
    }
  }

  .qq:hover,
  .qq-img {
    display: flex !important;
  }

  .BiliBili:hover,
  .BiliBili-img {
    display: flex !important;
  }

  .wechat:hover,
  .wechat-img {
    display: flex !important;
  }

  .link-img.qq-img {
    width: 140px;
    height: 140px;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);

    img {
      width: 120px;
      height: 120px;
    }
  }

  .link-img.BiliBili-img {
    width: 140px;
    height: 140px;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);

    img {
      width: 120px;
      height: 120px;
    }
  }

  .link-img.wechat-img {
    width: 140px;
    height: 140px;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);

    img {
      width: 120px;
      height: 120px;
    }
  }
</style>
