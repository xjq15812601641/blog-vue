import { defHttp } from '/@/utils/http/axios';
import {
  GetUserInfoModel,
  LoginParams,
  LoginResultModel,
  LikeAndCollectArticleModel,
  removeCollectArticleModel, RegisterModal
} from "./model/indexModel";
import { commonSuccessModel } from '../common/indexModel';

enum Api {
  find = '/user/find',
  user = '/user/register',
  update = '/user/update',
  Login = '/user/login',
  Logout = '/user/logout',
  Verify = '/user/verify',
  Code = '/user/code',
  addArticleLikeAndCollect = '/user/addLikeAndCollectArticle',
  removeCollectArticle = '/user/removeCollectArticle',
  sendCode = '/user/sendCode',
  modifyPwd = '/user/modifyPwd',
}

import { RoleEnum } from '/@/enums/roleEnum';

export function userRegister(data: RegisterModal) {
  return defHttp.postTest<string>({url: Api.user, ...data});
}

export function loginApi(params: LoginParams) {
  return defHttp.post<LoginResultModel>({url: Api.Login, params,});
}

export function doLogout() {
  return defHttp.post<commonSuccessModel>({ url: Api.Logout });
}

export function sendCode(data: { email?: string; phone?: string }) {
  return defHttp.postTest<commonSuccessModel>({ url: Api.sendCode, data });
}

export function modifyPwd(data: { code: string; password: string; email: string; phone: string }) {
  return defHttp.post<commonSuccessModel>({ url: Api.modifyPwd, data });
}

export function getUserInfo(id: string | number) {
  return defHttp.getTest<GetUserInfoModel & { role: RoleEnum; homePath: string }>({
    url: `${Api.find}/${id}`,
  });
}

export function modifyUserInfo(data: GetUserInfoModel) {
  return defHttp.post<commonSuccessModel>({ url: Api.update, data });
}

export function verfiy(
  type: 'username' | 'email' | 'phone',
  data: Pick<GetUserInfoModel, 'username' | 'email' | 'phone'>,
) {
  return defHttp.postTest<string>({
    url: `${Api.Verify}/${type}`,
    data,
  });
}

export function createCode(
  type: 'email' | 'phone',
  data: { email?: string; phone?: string }) {
  return defHttp.post<commonSuccessModel>({
    url: `${Api.Code}/${type}`,
    data,
  });
}

/* 给文章点赞和收藏 */
export function likeAndCollectArticle(data: LikeAndCollectArticleModel) {
  return defHttp.post<commonSuccessModel>({ url: Api.addArticleLikeAndCollect, data });
}

/* 用户取消收藏 */
export function removeCollectArticle(data: removeCollectArticleModel) {
  return defHttp.post<commonSuccessModel>({ url: Api.removeCollectArticle, data });
}
