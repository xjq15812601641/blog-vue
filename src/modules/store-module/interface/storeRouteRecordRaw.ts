import { RouteMeta, RouteRecordRaw } from 'vue-router';
import { Component } from '/@/modules/router-module/variable/routerVariable';

// @ts-ignore
export interface storeRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: storeRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}
