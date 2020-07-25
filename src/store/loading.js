import NProgress from "nprogress";

export default {
  state: {
    apiWaitingCount: 0,
  },
  mutations: {
    addLoading(state) {
      state.apiWaitingCount++;
      NProgress.start();
    },
    removeLoading(state) {
      state.apiWaitingCount--;
      if (state.apiWaitingCount <= 0) {
        state.apiWaitingCount = 0;
        NProgress.done();
      } else {
        NProgress.inc();
      }
    },
  },
  actions: {
    startLoading({ commit }) {
      commit("addLoading");
    },
    endLoading({ commit }) {
      commit("removeLoading");
    },
  },
  getters: {
    isLoading(state) {
      return state.apiWaitingCount !== 0;
    },
  },
};
