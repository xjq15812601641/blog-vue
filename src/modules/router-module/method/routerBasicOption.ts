import { AppRouteRecordRaw } from "/@/modules/router-module/interface/AppRouteRecordRaw";

export const getRouterBasicOption = () => {
  const LOGIN_ROUTE: AppRouteRecordRaw = {
    path: '/login',
    name: 'Login',
    component:  () => import('/@/views/sys/login/index.vue'),
    meta: {
      title: 'Login',
      hideMenu: true,
    },
  };
  const DASHBOARD_ROUTE: AppRouteRecordRaw = {
    path: '/', // 路由路径为根路径
    name: 'Dashboard', // 路由名称为Dashboard
    redirect: '/dashboard',
    component: () => import('/@/components/layouts/default/index.vue'), // 使用LAYOUT组件作为布局
    meta: {
      title: '仪表盘', // 页面标题为'仪表盘'
      hideChildrenInMenu: true, // 隐藏子菜单
      icon: 'bx:bx-home', // 使用'bx:bx-home'图标
    },
    children: [
      // 子路由配置
      {
        path: 'dashboard', // 子路由路径为/dashboard
        name: 'DashboardIndex', // 子路由名称为Home
        component: () => import('/@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          hideMenu: true, // 隐藏菜单项
          hideBreadcrumb: true, // 隐藏面包屑}
          currentActiveMenu: '/dashboard', // 当前激活菜单为/dashboard
          icon: 'bx:bx-home', // 使用'bx:bx-home'图标
        },
      },
    ],
  };
  const ARTICLE_ROUTE: AppRouteRecordRaw = {
    path: '/article',
    name: 'Article',
    component: () => import('/@/components/layouts/default/index.vue'),
    redirect: '/article/list/front',
    meta: {
      icon: 'bx:category',
      title: '文章分类',
    },
    children: [
      {
        path: 'list/front',
        name: 'Front',
        meta: { title: '前端' },
        component: () => import('/@/views/article/list/index.vue'),
      },
      {
        path: 'list/back',
        name: 'Back',
        meta: { title: '后台' },
        component: () => import('/@/views/article/list/index.vue'),
      },
      {
        path: 'list/ops',
        name: 'Ops',
        meta: { title: '运维' },
        component: () => import('/@/views/article/list/index.vue'),
      },
      {
        path: 'detail',
        name: 'ArticleDetail',
        meta: { title: '详情', hideMenu: true },
        component: () => import('/@/views/article/detail/index.vue'),
      },
    ],
  };
  const JOTTING_ROUTE: AppRouteRecordRaw = {
    path: '/relife',
    name: 'Relife',
    component: () => import('/@/components/layouts/default/index.vue'),
    redirect: '/relife/list',
    meta: {
      icon: 'icon-park-outline:collection-records',
      title: '生活点滴',
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'list',
        name: 'LifeList',
        component: () => import('/@/views/article/list/index.vue'),
        meta: { title: '生活点滴' },
      },
      {
        path: 'detail',
        name: 'RelifeDetail',
        component: import('/@/views/article/detail/index.vue'),
        meta: { title: '详情', hideMenu: true },
      },
    ],
  };
  const MESSAGE_ROUTE: AppRouteRecordRaw = {
    path: '/message',
    name: 'Message',
    component: () => import('/@/components/layouts/default/index.vue'),
    redirect: '/message/index',
    meta: {
      icon: 'bx:message-detail',
      title: '留言板',
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'index',
        name: 'MessageIndex',
        meta: { title: '留言板' },
        component: () => import('/@/views/message/index.vue'),
      },
    ],
  };


  const REDIRECT_ROUTE: AppRouteRecordRaw = {
    path: '/redirect',
    component: () => import('/@/components/layouts/default/index.vue'),
    name: 'RedirectTo',
    meta: {
      title: 'Redirect',
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('/@/views/sys/redirect/index.vue'),
        meta: {
          title: 'Redirect',
          hideBreadcrumb: true,
        },
      },
    ],
  };
  const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
    path: '/:path(.*)*',
    name: 'PageNotFound',
    component: () => import('/@/components/layouts/default/index.vue'),
    meta: {
      title: 'ErrorPage',
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children: [
      {
        path: '/:path(.*)*',
        name: 'PageNotFound',
        component: () => import('/@/views/sys/exception/Exception.vue'),
        meta: {
          title: 'ErrorPage',
          hideBreadcrumb: true,
          hideMenu: true,
        },
      },
    ],
  };
  const ABOUT_ROUTE: AppRouteRecordRaw = {
    path: '/about',
    name: 'ABOUT',
    component: () => import('/@/components/layouts/default/index.vue'),
    redirect: '/about/index',
    meta: {
      icon: 'mdi:access-point',
      title: '链接',
      hideChildrenInMenu: true,
    },
    children: [
      {
        path: 'index',
        name: 'AboutIndex',
        meta: { title: '链接' },
        component: () => import('/@/views/about/index.vue'),
      },
    ],
  };

  return [
    LOGIN_ROUTE,
    ABOUT_ROUTE,
    DASHBOARD_ROUTE,
    ARTICLE_ROUTE,
    JOTTING_ROUTE,
    REDIRECT_ROUTE,
    PAGE_NOT_FOUND_ROUTE,
  ];
};
