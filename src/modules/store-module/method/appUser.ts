import { defineStore } from "pinia";
import { UserState } from "/@/modules/store-module/interface/user-module/userState";
import { GetUserInfoModel } from "/@/modules/store-module/interface/user-module/getUserInfoModel";
import { BlogCache } from "/@/modules/cache-module/BlogCache";
import { RoleEnum } from "/@/enums/roleEnum";
import { ProjectKeyEnum } from "/@/enums/projectkeyEnum";
import { LoginParams } from "/@/api/user/model/indexModel";
import { getUserInfo, loginApi } from "/@/api/user";
import { BlogPermissionStore } from "/@/modules/store-module/variable/storeVariable";
import { basicRoutes, router } from "/@/modules/router-module/variable/routerVariable";
import { RouteRecordRaw } from "vue-router";
import { BlogMessage } from "/@/modules/message-module/blogMessage";

export const appUserStore = defineStore({
  id: 'userStore',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    role: '',
    sessionTimeout: false,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): GetUserInfoModel {
      return this.userInfo || BlogCache.getCache<GetUserInfoModel>(ProjectKeyEnum.userinfo_key) as GetUserInfoModel || {};
    },
    getToken(): string {
      return this.token || BlogCache.getCache<string>(ProjectKeyEnum.token_key) as string;
    },
    getRole(): RoleEnum | '' {
      return this.role;
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      // 将数据存储到本地缓存中。第一个参数 key 是要存储的数据的键，第二个参数 value 是要存储的数据的值
      BlogCache.setCache(ProjectKeyEnum.token_key, info);
    },
    setRole(role: RoleEnum) {
      this.role = role;
      BlogCache.setCache(ProjectKeyEnum.role_key, role);
    },
    setUserInfo(info: GetUserInfoModel | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      BlogCache.setCache(ProjectKeyEnum.userinfo_key, info as any, true);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.role = '';
      this.sessionTimeout = false;
    },
    async login(
      params: LoginParams
    ) {
      const { ...loginParams } = params;
      try {
        // 进入后端登录得到token
        const { token, userId } = await loginApi(loginParams);
        // 设置缓存
        this.setToken(token);
        return this.afterLoginAction(userId);
      } catch (e) {
        console.log(e);
      }
    },

    /* 登录之后的回调 */
    async afterLoginAction(userId: string | number): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      // 获取用户信息
      const userInfo = await this.getUserInfoAction(userId);
      // 获取 sessionTimeout 变量的值
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        // 获取 permissionStore 对象
        const permissionStore = BlogPermissionStore;
        if (!permissionStore.isDynamicAddedRoute) {
          // 构建动态路由
          const routes = await permissionStore.buildRoutesAction();
          // 遍历routes将每个路由添加到路由器中
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          // 将 PAGE_NOT_FOUND_ROUTE 添加为路由器中的一个路由
          router.addRoute(basicRoutes.find(route => route.name === 'PageNotFound') as unknown as RouteRecordRaw);
          // 将 isDynamicAddedRoute 设置为真。
          permissionStore.setDynamicAddedRoute(true);
        }
        // 导航到 BASE_HOME 页面
        await router.replace('/dashboard');
      }
      return userInfo;
    },

    async getUserInfoAction(userId: string | number): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo(userId);
      console.log("获取user信息成功");
      const { role } = userInfo;
      this.setRole(role);
      this.setUserInfo(userInfo);
      return userInfo;
    },

    /**
     * @description: logout
     */
    async logout() {
      BlogMessage.useMessage().createMessage.success('退出成功');
      this.setToken(undefined);
      this.setRole(RoleEnum.VISITOR);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      window.location.href = `${window.location.origin}/dashboard`;
    },
  },

})
