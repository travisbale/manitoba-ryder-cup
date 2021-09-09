import Vue from 'vue';
import Vuex from 'vuex';

import articles from '@/store/modules/articles';
import courses from '@/store/modules/courses';
import currentUser from '@/store/modules/current-user';
import matches from '@/store/modules/matches';
import players from '@/store/modules/players';
import scores from '@/store/modules/scores';
import teeSets from '@/store/modules/tee-sets';
import tournaments from '@/store/modules/tournaments';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  modules: {
    articles,
    courses,
    matches,
    tournaments,
    currentUser,
    players,
    scores,
    teeSets,
  },
});
