import Vue from 'vue';
import Vuex from 'vuex';

import currentUser from '@/store/modules/current-user';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  state: {
  },

  mutations: {
  },

  actions: {
  },

  modules: {
    currentUser,
  },
});
