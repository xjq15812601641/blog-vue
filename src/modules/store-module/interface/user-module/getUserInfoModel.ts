import { RoleEnum } from "/@/enums/roleEnum";

export interface GetUserInfoModel {
  id: number;
  // 用户名
  username: string;
  // 头像
  avatar: string;
  // 邮箱
  email: string;
  // 性别
  sex: number;
  // 标签
  label: number;
  // 是否友链
  // showLink: boolean;
  // 友链信息
  // logo: string;

  // siteName: string;

  // desc: string;

  // siteUrl: string;

  role?: RoleEnum;

  homePath?: string;

  phone: string;
}
