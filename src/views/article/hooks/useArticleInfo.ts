import { ref } from 'vue';
import type { Article } from '/@/api/article/model/indexModel';
import {getArticleByID} from '/@/api/article';
import { Router } from 'vue-router';


export default (id: string, router: Router) => {
  //文章模板
  const articleInfo = ref<Article>({
    id: -1,
    title: '',
    likes: 0,
    collects: 0,
    browse: 0,
    content: '',
    comments: 0,
    subType: 0,
    type: 1,
    imageUrl: '',
    createTime: new Date(),
    subject: 'article',
  });

  /* 获取文章信息 */
  const getArticleDetails
    = async () => {
    try {
      articleInfo.value = await getArticleByID(id);
    } catch (e) {
      router.back();//如果文章被实时删除就无法访问直接回到/dashboard页面，回到上个路由页面
    }
  };


  return {
    getArticleDetails,
    articleInfo,
  };
};
