import { FunctionalComponent } from "vue";
import { RouteLocation } from "vue-router";

export interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable };
  route: RouteLocation;
}
