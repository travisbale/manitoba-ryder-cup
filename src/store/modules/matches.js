import { DateTime } from 'luxon';
import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    matches: [],
  },

  getters: {
    getMatch(state) {
      return (id) => state.matches.find((match) => match.id === id);
    },

    getMatches(state) {
      return (format) => state.matches.filter((match) => match.format === format);
    },
  },

  mutations: {
    setMatch(state, match) {
      const index = state.matches.findIndex(({ id }) => id === match.id);

      if (index >= 0) {
        state.matches.splice(index, 1, match);
      } else {
        state.matches.push(match);
      }
    },

    setMatches(state, matches) {
      state.matches = matches;

      for (let i = 0; i < matches.length; i++) {
        state.matches[i].teeTime = DateTime.fromISO(matches[i].teeTime);
      }
    },
  },

  actions: {
    fetchMatch({ commit }, matchId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/matches/${matchId}`;

      return axios.get(url).then((response) => {
        const match = response.data;

        match.teeTime = DateTime.fromISO(match.teeTime);

        commit('setMatch', match);
        return match;
      });
    },

    fetchMatches({ commit }, tournamentId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments/${tournamentId}/matches`;

      return axios.get(url).then((response) => {
        commit('setMatches', response.data);
      });
    },
  },
};
