
import {
  Article,
  GetCategoryModel,
  GetListByCommentModel,
  CreateArticle,
  UpdateArticle, Collection,
} from './model/indexModel';

import { commonSuccessModel, GetListModel } from '/@/api/common/indexModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  /*首页获取文章请求*/
  article = '/article/get',
  category = '/article/category',
  comment = '/article/comment',
  browse = '/article/browse',
  collectArticle = '/article/collect',
  update = '/article/update',
  collection = '/collection/get'
}

export function getArticleList(params) {
  return defHttp.postTest<GetListModel<Article>>({ url: Api.article, params });
}

/* 发布新文章 */
export function createArticle(data: CreateArticle) {
  return defHttp.post<commonSuccessModel>(
    { url: Api.article, data },
    { errorMessageMode: 'message' },
  );
}

/* 修改发布的文章 */
export function modifyArticle(data: UpdateArticle) {
  return defHttp.post<commonSuccessModel>({ url: Api.update, data });
}

export function getCategory(params) {
  return defHttp.get<GetCategoryModel>(
    { url: Api.category, params },
    { errorMessageMode: 'message' },
  );
}

/*获取文章内容*/
export function getArticleListByComment() {
  return defHttp.getTest<GetListByCommentModel>({ url: Api.comment });
}

export function getCollectionList(){
  return defHttp.post<Array<Collection>>({ url: Api.collection });
}

// export function getArticleListByBrowse() {
//   return defHttp.get<GetListByBrowseModel>({ url: Api.browse });
// }

export function getArticleByID(id) {
  return defHttp.getTest<Article>({ url: `${Api.article}/${id}` });
}

/* 获取用户收藏的所有文章 */
export function getCollectArticleList(params) {
  return defHttp.get<GetListModel<Article & { checked?: boolean; subject: string }>>({
    url: Api.collectArticle,
    params,
  });
}
