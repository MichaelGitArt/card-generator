import Vue from "vue";
import Vuex from "vuex";
import loadingStore from "./loading";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loading: loadingStore,
  },
  state: {
    cardUrl: null,
    cardId: null,
    shareUrl: null,
    controls: null,
    ready: false,
  },
  mutations: {
    setCard(state, { id, url, shareUrl }) {
      state.cardId = id;
      state.cardUrl = url;
      state.shareUrl = shareUrl;
    },
    setControls(state, controls) {
      state.controls = controls;
      state.ready = true;
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
    initApp({ dispatch, commit }) {
      dispatch("startLoading");
      fetch("https://loh.biz/8/api.php?action=data", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((resData) => {
          const categories = convertForControl(resData.categories);
          const genders = convertForControl(resData.genders);
          const modes = convertForControl(resData.modes);

          commit("setControls", { categories, genders, modes });
        })
        .finally(() => {
          dispatch("endLoading");
        });
    },
  },
});

function convertForControl(obj) {
  const arr = [];
  Object.keys(obj).forEach((key, index) => {
    arr.push({
      key,
      id: index,
      name: obj[key],
    });
  });
  return arr;
}
