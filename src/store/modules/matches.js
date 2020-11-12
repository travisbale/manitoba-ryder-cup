import { DateTime } from 'luxon';
import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    matches: [],
  },

  getters: {
    getMatches(state) {
      return (format) => state.matches.filter((match) => match.format === format);
    },
  },

  mutations: {
    setMatches(state, matches) {
      state.matches = matches;

      for (let i = 0; i < matches.length; i++) {
        state.matches[i].teeTime = DateTime.fromISO(matches[i].teeTime);
      }
    },
  },

  actions: {
    getMatches({ commit }, tournamentId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments/${tournamentId}/matches`;

      return axios.get(url).then((response) => {
        commit('setMatches', response.data);
      });
    },
  },
};
