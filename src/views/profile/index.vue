<template>
  <div class="p-4">
    <Avatar class="enter-y relative z-index-2" /><!--头像及旋转特效-->
  </div>
<!--  <div class="flex justify-center w-11/12 sm:w-5/8 mx-auto mt-10">-->
<!--    <section v-if="!isEdit" class="w-full relative p-4 rounded mb-6 bg-white/70 show-container">-->
<!--      <header>-->
<!--        <h1 class="my-3 text-2xl font-bold text-center">-->
<!--          个人中心-->
<!--          <span-->
<!--            class="float-right text-base cursor-pointer text-gray-800 hover:text-purple-700"-->
<!--            @click="isEdit = !isEdit"-->
<!--            ><Icon icon="akar-icons:edit" class="mr-1" />编辑</span-->
<!--          >-->
<!--        </h1>-->
<!--      </header>-->
<!--      <section>-->
<!--        <ul class="userInfoBox">-->
<!--          <li class="avatarlist">-->
<!--            <span class="tip-title">头像</span>-->
<!--            <div class="avatar-box !lg:ml-16">-->
<!--              <img-->
<!--                :src="userInfo.avatar"-->
<!--                @error="handleImg"-->
<!--                style="object-fit: cover; width: 100px; height: 100px; background-size: cover"-->
<!--              />-->
<!--            </div>-->
<!--          </li>-->
<!--          <li class="username">-->
<!--            <span class="tip-title">昵称</span>-->
<!--            <span class="rightInner !lg:ml-16 ellipsis-1"> {{ userInfo.username }} </span>-->
<!--          </li>-->
<!--          <li>-->
<!--            <span class="tip-title">{{ identityObj.str }}</span>-->
<!--            <span class="ellipsis-1 !lg:ml-16 rightInner"> {{ identityObj.value }} </span>-->
<!--          </li>-->
<!--          <li>-->
<!--            <span class="tip-title">性别</span>-->
<!--            <span class="rightInner !lg:ml-16"> {{ sexStr }} </span>-->
<!--          </li>-->
<!--          <li>-->
<!--            <span class="tip-title">个性标签</span>-->
<!--            <span class="rightInner !lg:ml-16"> {{ labelStr }} </span>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </section>-->
<!--    </section>-->

<!--    <section v-else class="w-full relative p-4 rounded mb-6 bg-white/70 edit-container">-->
<!--      <header>-->
<!--        <h1 class="my-3 text-2xl font-bold text-center">编辑个人资料</h1>-->
<!--      </header>-->
<!--      <section>-->
<!--        <ul class="userInfoBox">-->
<!--          <li class="avatarlist">-->
<!--            <span class="tip-title !align-top">头像</span>-->
<!--            <UploadImg-->
<!--              @query-url="queryImgUrl"-->
<!--              :initUrl="avatarUrl"-->
<!--              v-if="getIsIOS"-->
<!--              type="avatar"-->
<!--            />-->
<!--            <CropperAvatar-->
<!--              v-else-->
<!--              :uploadApi="UploadAvatarApi"-->
<!--              :value="userInfo.avatar || defaultImg"-->
<!--              width="100"-->
<!--              :showBtn="false"-->
<!--              class="!lg:ml-16"-->
<!--              type="avatar"-->
<!--              @change="queryImgUrl"-->
<!--              ref="AvatarUploadRef"-->
<!--            />-->
<!--          </li>-->
<!--          <li class="username">-->
<!--            <span class="tip-title">昵称</span>-->
<!--            <Input-->
<!--              placeholder="昵称"-->
<!--              class="rightInner input !lg:ml-16"-->
<!--              :maxlength="12"-->
<!--              v-model:value="userInfo.username"-->
<!--            />-->
<!--          </li>-->
<!--          <li>-->
<!--            <span class="tip-title">{{ identityObj.str }}</span>-->
<!--            <span class="ellipsis-1 rightInner !lg:ml-16"> {{ identityObj.value }} </span>-->
<!--          </li>-->
<!--          <li>-->
<!--            <span class="tip-title">性别</span>-->
<!--            <RadioGroup v-model:value="userInfo.sex" class="rightInner !lg:ml-16">-->
<!--              <Radio label="男" :value="0">男</Radio>-->
<!--              <Radio label="女" :value="1">女</Radio>-->
<!--            </RadioGroup>-->
<!--          </li>-->
<!--          <li>-->
<!--            <span class="tip-title">个性标签</span>-->
<!--            <RadioGroup v-model:value="userInfo.label" class="rightInner label !lg:ml-16">-->
<!--              <Radio-->
<!--                v-for="item in labelList"-->
<!--                :key="item.value"-->
<!--                :value="item.value"-->
<!--                :label="item.label"-->
<!--                class="mb-2"-->
<!--                >{{ item.label }}</Radio-->
<!--              >-->
<!--            </RadioGroup>-->
<!--          </li>-->
<!--        </ul>-->
<!--        <div class="saveInfobtn">-->
<!--          <a class="tcolors-bg" href="javascript:void(0);" @click="back">返 回</a>-->
<!--          <a class="tcolors-bg" href="javascript:void(0);" @click="modify">保 存</a>-->
<!--        </div>-->
<!--      </section>-->
<!--    </section>-->
<!--  </div>-->
</template>

<script setup lang="ts">
  import Avatar from './Avatar.vue';

  // import { ref, computed } from 'vue';
  // import Icon from '/@/components/Icon/Icon.vue';
  // import CropperAvatar from '/@/components/Cropper/CropperAvatar.vue';
  // import { uploadApi, deleteFileApi } from '/@/api/minio/index';
  // import { Radio, Input } from 'ant-design-vue';
  // import { GetUserInfoModel } from '/@/api/user/model/indexModel';
  // import { getUserInfo, modifyUserInfo } from '/@/api/user/index';
  // import { cloneDeep } from 'lodash-es';
  // import { labelList } from './data';
  // import UploadImg from '../common/UploadImg.vue';
  // import { useAppInject } from "/@/modules/component-module/layout-module/method/menu/useAppInject";
  // import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
  // import { useImgLoadError } from "/@/views/common/hooks/useImgLoadError";
  // import { BlogMessage } from "/@/modules/message-module/blogMessage";
  // import { BlogCache } from "/@/modules/cache-module/BlogCache";
  // import { ProjectKeyEnum } from "/@/enums/projectkeyEnum";
  // import { isProdMode } from "/@/utils/env/method/isProdMode";
  //
  //
  // const RadioGroup = Radio.Group;
  //
  // const UploadAvatarApi = uploadApi as any;
  // const isEdit = ref(false);
  // const AvatarUploadRef = ref();
  // const { getIsIOS } = useAppInject();
  // const userInfo = ref<GetUserInfoModel>({
  //   id: 0,
  //   username: '',
  //   email: '',
  //   sex: 0,
  //   label: 0,
  //   avatar: '',
  //   phone: '',
  // });
  // const userStore = BlogUserStore;
  // const avatarUrl = ref<string>('');
  //
  // const tempAvatar = ref('');
  //
  // const { handleImg } = useImgLoadError();
  //
  // const sexStr = computed(() =>
  //   userInfo.value.sex === 0 ? '男' : userInfo.value.sex === 1 ? '女' : '未知',
  // );
  //
  // const labelStr = computed(
  //   () => labelList.find((item) => item.value === userInfo.value.label)!.label,
  // );
  //
  // const { createMessage } = BlogMessage.useMessage();
  //
  // /* 获取用户信息  */
  // const getInfo = async () => {
  //   const { id } = BlogCache.getCache(ProjectKeyEnum.userinfo_key) as GetUserInfoModel;
  //   const info = await getUserInfo(id);
  //   userStore.setUserInfo(info);
  //   userInfo.value = info;
  //   if (info.avatar) {
  //     avatarUrl.value = info.avatar;
  //   }
  // };
  //
  // getInfo();
  //
  // /* back */
  // const back = () => {
  //   tempAvatar.value = '';
  //   getInfo();
  //   window.scrollTo(0, 0);
  //   isEdit.value = false;
  // };
  //
  // /* modify */
  // const modify = async () => {
  //   const data = cloneDeep(userInfo.value);
  //   await AvatarUploadRef.value.doUpload(data.avatar);
  //
  //   if (tempAvatar.value && avatarUrl.value) {
  //     const oldFilename = /[^/]+\.\w{2,5}$/g.exec(data.avatar)?.[0] || '';
  //     await deleteFileApi(oldFilename, { bucket: 'user-avatar' });
  //   }
  //
  //   if (tempAvatar.value) {
  //     data.avatar = `${
  //       isProdMode() ? window.location.origin : 'http://siwang.cn.ma'
  //     }/img/static/user-avatar/${tempAvatar.value}`;
  //   }
  //
  //   const { message } = await modifyUserInfo(data);
  //   if (message) {
  //     createMessage.success(message);
  //     back();
  //   }
  // };
  //
  // const queryImgUrl = ({ data, typeStr }) => {
  //   const { url } = data;
  //   if (typeStr === 'avatar') {
  //     tempAvatar.value = url;
  //   }
  // };
  //
  // const identityObj = computed(() => {
  //   if (userInfo.value.phone) {
  //     return {
  //       str: '手机号',
  //       value: userInfo.value.phone,
  //     };
  //   } else {
  //     return {
  //       str: '邮箱',
  //       value: userInfo.value.email,
  //     };
  //   }
  // });
</script>

<style lang="less" scoped>
  .show-container,
  .edit-container {
    header {
      h1 {
        line-height: 30px;
      }
    }

    section {
      .userInfoBox {
        li {
          padding: 20px;
          border-bottom: 1px solid #ddd;

          .tip-title {
            display: inline-block;
            width: 90px;
            padding: 10px 0;
            vertical-align: middle;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
          }

          .avatar-box {
            display: inline-block;
            vertical-align: top;
            width: 98px;
            height: 98px;
            border-radius: 50%;
            overflow: hidden;

            .mobil {
              display: none;
            }
          }

          .rightInner {
            display: inline-block;
            vertical-align: middle;
            font-size: 16px;
            color: #0960bd;
            background-color: transparent;
          }

          .rightInner::placeholder {
            color: #fff;
          }

          .rightInner.input {
            width: calc(100% - 100px);
            max-width: 300px;
          }
        }

        &:last-child {
          border-bottom: 1px solid transparent;
        }
      }

      .saveInfobtn {
        margin: 20px 0;
        text-align: center;

        a {
          color: #fff;
          padding: 6px 20px;
          margin: 5px 10px;
          border-radius: 5px;
          font-size: 14px;
        }
      }
    }

    .tcolors-bg {
      display: inline-block;
      background: #0960bd;
      transition: all 0.3s ease-in-out;
    }

    .tcolors-bg:hover {
      background: #48456d;
      transform: scale(1.02);
    }
  }

  input {
    background-color: transparent;
    color: #333;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding: 10px;
    margin: 8px 0;
    font-size: 14px;
    letter-spacing: 2px;
  }

  input::placeholder {
    color: #fff;
  }

  input:focus {
    color: #a262ad;
    outline: none !important;
    border-bottom: 1px solid #a262ad80;
    transition: all 0.5s;
    box-shadow: none;
  }

  input:focus::placeholder {
    opacity: 0;
  }
</style>
