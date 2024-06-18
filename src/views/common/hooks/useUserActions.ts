import { unref } from 'vue';
import { MessageComment } from '/@/api/message/model/indexModel';
import { useDebounceFn } from '@vueuse/shared';
import { toggleLikes } from '/@/api/message/index';
import { BlogMessage } from "/@/modules/message-module/blogMessage";
import {
  useCopyToClipboard
} from "/@/modules/component-module/icon-module/method/useCopyToClipboard";
import { useModal } from "/@/modules/component-module/modal-module/method/modal";
import { BlogCache } from "/@/modules/cache-module/BlogCache";
import { ProjectKeyEnum } from "/@/enums/projectkeyEnum";

export default () => {
  const { createMessage } = BlogMessage.useMessage();
  const { clipboardRef, copiedRef } = useCopyToClipboard();
  const [registerReport, { openModal: openReportModal }] = useModal();

  /* 点赞评论分享举报 */
  const doAction = (num: number, payload: MessageComment) => {
    if (!BlogCache.getCache(ProjectKeyEnum.token_key) && num !== 3) return createMessage.error('只有登录后才能操作哦~');
    switch (num) {
      case 1:
      case 2:
        toggleLikeComment(payload, num);
        break;
      case 3:
        shareSite();
        break;
      case 4:
        payload.doReply = !payload.doReply;
        break;
      case 5:
        open(payload);
        break;
    }
  };

  /* 点赞取消 */
  const toggleLikeComment = async (payload: MessageComment, num) => {
    let type;
    if (num === 1) {
      type = 'like';
      payload.tempLikeStatus = !payload.tempLikeStatus;
      if (payload.tempLikeStatus) {
        payload.likes = +payload.likes + 1;
        if (payload.tempUnlikeStatus) {
          payload.tempUnlikeStatus = false;
          payload.unlikes <= 0 ? (payload.unlikes = 0) : (payload.unlikes -= 1);
        }
      } else {
        payload.likes <= 0 ? (payload.likes = 0) : (payload.likes -= 1);
      }
    } else {
      type = 'unlike';
      payload.tempUnlikeStatus = !payload.tempUnlikeStatus;
      if (payload.tempUnlikeStatus) {
        payload.unlikes = +payload.unlikes + 1;
        if (payload.tempLikeStatus) {
          payload.tempLikeStatus = false;
          payload.likes <= 0 ? (payload.likes = 0) : (payload.likes -= 1);
        }
      } else {
        payload.unlikes <= 0 ? (payload.unlikes = 0) : (payload.unlikes -= 1);
      }
    }
    doLikesAction(payload, type);
  };

  /* 防抖包装点赞、点踩请求 */
  const doLikesAction = useDebounceFn(async (payload, type) => {
    const status = type === 'like' ? payload.tempLikeStatus : payload.tempUnlikeStatus;
    await toggleLikes({ id: payload.id, type, status });
  }, 400);

  /* 分享网站地址 */
  const shareSite = () => {
    clipboardRef.value = window.location.href;
    if (unref(copiedRef)) {
      createMessage.warning('链接复制成功，快去分享吧！');
    }
  };

  /* 打开举报弹窗 */
  const open = (data: MessageComment) => {
    openReportModal(true, {
      id: data.id,
    });
  };

  return {
    doAction,
    registerReport,
  };
};
