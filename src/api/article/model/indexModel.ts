import { BaseUserInfo } from '/@/api/message/model/indexModel';

/* 列表文章 */
export interface ArticleList extends Article {
  categoryInfo: Category;
}



/* 详情文章 */
export interface Article {
  id: number;
  title: string;/* 文章标题 */
  comments: number;/* 评论数 */
  likes: number;/* 点赞数 */
  collects: number;/* 收藏数 */
  browse: number;/* 浏览量 */
  content: string;/* 内容 默认md格式文档 */
  imageUrl: string;/* 背景图片 */
  type: number;/* 分类：0 前端、1 后端、2 运维 */
  subType: number;/* 再分类 */
  createTime: Date;/* 创建时间 */
  subject: string;/* 分类：”relife 生活点滴、 article 文章“*/
}

export interface GetCategoryModel {
  type: Category;
  children: Array<Category>;
}

export interface Category {
  id: number;
  name: string;
}

export interface CommentModel {
  id: number;
  content: string;
  articleId: number;
  createTime: Date;
  userId: number;
  articleInfo: Article;
  userInfo: BaseUserInfo;
}

export interface CreateArticle {
  title: string;
  content: string;
  type: string;
  subType: string;
  imageUrl: string;
  subject: string;
}

export interface UpdateArticle extends CreateArticle {
  id: string;
}

export interface Collection {
  id: number;
  content: string;
  title: string;
}
export interface GetListByCollection {
  records: Array<Collection>;
}

export type GetListByCommentModel = Array<CommentModel>;
