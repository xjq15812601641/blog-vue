import { defHttp } from '/@/utils/http/axios';
import { addMenu, getMenuListResultModel } from './model';
import { commonSuccessModel } from '../common/indexModel';

enum Api {
  addMenu = '/menu/add',
  getMenuList = '/menu/all',
  updateMenu = '/menu/update',
  deleteMenu = '/menu/delete',
}

export const createMenu = (data: addMenu) => {
  return defHttp.post<commonSuccessModel>({ url: Api.addMenu, data });
};

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.getMenuList });
};

export const updateMenu = (id: string, data: addMenu) => {
  return defHttp.post<commonSuccessModel>({ url: `${Api.updateMenu}/${id}`, data });
};

export const deleteMenu = (data: { id: string }) => {
  return defHttp.post<commonSuccessModel>({ url: Api.deleteMenu, data });
};
