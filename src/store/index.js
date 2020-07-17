import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cardUrl: null,
    cardId: null,
    shareUrl: null,
  },
  mutations: {
    setCard(state, { id, url, shareUrl }) {
      state.cardId = id;
      state.cardUrl = url;
      state.shareUrl = shareUrl;
    },
    clear(state) {
      state.cardId = null;
      state.cardUrl = null;
      state.shareUrl = null;
    },
  },
  actions: {
    setCard({ commit }, id) {
      const url = `https://loh.biz/8/img/${id}.png`;
      const shareUrl = window.location.href + `for-you/${id}`;
      commit("setCard", { id, url, shareUrl });
    },
  },
});
