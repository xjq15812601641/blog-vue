import { GetListModel, commonSuccessModel } from '../common/indexModel';
import {FriendLinkModel, LinkModel, PaginationModel} from './model/indexModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  add = '/friend-link/add',
  list = '/link/list',
  verify = '/friend-link/verify',
  remove = '/friend-link/delete',
}

/* 申请友链 */
export function add(params: Omit<FriendLinkModel, 'hasVerified'>) {
  return defHttp.post<commonSuccessModel>({ url: Api.add, params });
}

/* 获取链列表 */
export function getFriendLink(params: PaginationModel) {
  return defHttp.postTest<GetListModel<FriendLinkModel>>({ url: Api.list, params });
}
export function getLink(params: PaginationModel) {
  return defHttp.postTest<GetListModel<LinkModel>>({ url: Api.list, params });
}

/* 删除没通过验证的友链 */
export function removeFriendLink(id: string) {
  return defHttp.post<commonSuccessModel>({ url: `${Api.remove}/${id}` });
}

/* 友链验证 */
export function verifyFriendLink(id: string, data: { verify: boolean }) {
  return defHttp.post<commonSuccessModel>({ url: `${Api.verify}/${id}`, data });
}
