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

    getTournament: (state) => (tournamentId) => {
      return state.tournaments.find((t) => t.id === tournamentId) || {
        name: '',
        startDate: DateTime.local(),
        endDate: DateTime.local(),
        teams: [],
      };
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

    setTournament(state, tournament) {
      const index = state.tournaments.findIndex(({ id }) => id === tournament.id);

      /* eslint-disable */
      tournament.startDate = DateTime.fromISO(tournament.startDate);
      tournament.endDate = DateTime.fromISO(tournament.endDate);
      /* eslint-enable */

      if (index >= 0) state.tournaments.splice(index, 1, tournament);
      else state.tournaments.push(tournament);
    },
  },

  actions: {
    fetchTournaments({ commit }) {
      return axios.get(`${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments`).then((response) => {
        commit('setTournaments', response.data);
      });
    },

    fetchTournament({ state, commit }, tournamentId) {
      const tournament = state.tournaments.find((t) => t.id === tournamentId);

      if (tournament == null) {
        return axios.get(`${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments/${tournamentId}`).then((response) => {
          commit('setTournament', response.data);
          return response.data;
        });
      }

      return Promise.resolve(tournament);
    },

    saveTournament({ commit }, tournament) {
      let saving;
      const newTournament = {
        name: tournament.name,
        startDate: tournament.startDate.toISODate(),
        endDate: tournament.endDate.toISODate(),
        location: tournament.location,
      };

      if (tournament.id == null) {
        saving = axios.post(`${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments`, newTournament);
      } else {
        saving = axios.put(`${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments/${tournament.id}`, newTournament);
      }

      return saving.then((response) => commit('setTournament', response.data));
    },
  },
};
