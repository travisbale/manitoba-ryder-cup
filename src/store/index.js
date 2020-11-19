import Vue from 'vue';
import Vuex from 'vuex';

import courses from '@/store/modules/courses';
import currentUser from '@/store/modules/current-user';
import matches from '@/store/modules/matches';
import teams from '@/store/modules/teams';
import teeSet from '@/store/modules/tee-set';
import tournaments from '@/store/modules/tournaments';

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
    courses,
    matches,
    tournaments,
    currentUser,
    teams,
    teeSet,
  },
});
