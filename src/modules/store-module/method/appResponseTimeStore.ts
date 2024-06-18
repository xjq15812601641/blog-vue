import { defineStore } from "pinia";
import { TimeState } from "/@/modules/store-module/interface/timeState";

export const appResponseTime = defineStore({
  id: 'app-time',

  state: (): TimeState => ({
    responseTime: 0
  }),

  getters: {
    getTime(): Timeable {
      return this.responseTime;
    }
  },

  actions: {
    setTime(responseTime: Timeable) {
      this.responseTime = responseTime;
    }
  }
});
