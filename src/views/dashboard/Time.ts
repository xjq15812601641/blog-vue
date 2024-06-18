import { defineStore } from 'pinia';

interface TimeState {
  responseTime: Timeable;
}

export const useResponseTime = defineStore({
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
