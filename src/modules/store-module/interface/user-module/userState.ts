import { RoleEnum } from "/@/enums/roleEnum";
import { GetUserInfoModel } from "/@/api/user/model/indexModel";

export interface UserState {
  userInfo: Nullable<GetUserInfoModel>;
  token?: string;
  role: RoleEnum | '';
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}
