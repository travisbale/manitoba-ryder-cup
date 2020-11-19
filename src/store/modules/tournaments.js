import { DateTime } from 'luxon';

import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    tournaments: [],
  },

  getters: {
    currentTournament(state) {
      return state.tournaments.length > 0 ? state.tournaments[0] : { id: 0 };
    },
  },

  mutations: {
    setTournaments(state, tournaments) {
      state.tournaments = tournaments;

      for (let i = 0; i < tournaments.length; i++) {
        state.tournaments[i].startDate = DateTime.fromISO(tournaments[i].startDate);
        state.tournaments[i].endDate = DateTime.fromISO(tournaments[i].endDate);
      }
    },

    saveTournament(state, tournament) {
      const index = state.tournaments.findIndex(({ id }) => id === tournament.id);

      if (index >= 0) state.tournaments.splice(index, 1, tournament);
      else state.tournaments.push(tournament);
    },
  },

  actions: {
    fetchTournaments({ state, commit }) {
      if (state.tournaments.length === 0) {
        return axios.get(`${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments`).then((response) => {
          commit('setTournaments', response.data);
        });
      }
      return Promise.resolve({});
    },

    saveTournament({ commit }, tournament) {
      let saving;

      if (tournament.id == null) {
        saving = axios.post('tournaments/tournaments');
      } else {
        saving = axios.put('tournaments.tournaments');
      }

      return saving.then((response) => commit('saveTournament', response.data));
    },
  },
};
