import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import uuidv1 from 'uuid/v1';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    mchId: '',
  },
  mutations: {
    setUser(state, user) {
      state.mchId = uuidv1();
      state.user = user;
    },
    logout(state) {
      state.mchId = '';
      state.user = null;
    },
    updateNickname(state, nickname) {
      if (state.user) {
        state.user.nickname = nickname;
      }
    },
  },
  actions: {

  },
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});
