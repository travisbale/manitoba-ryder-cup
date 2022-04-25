import { DateTime } from 'luxon';
import axios from '@/lib/axios';

const url = process.env.VUE_APP_SCORECARD_URL;

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

    addParticipants(state, payload) {
      const match = state.matches.find((m) => m.id === payload.matchId);

      payload.players.forEach((player) => {
        match.participants.push({
          team: payload.teamColor,
          player,
        });
      });
    },

    removeParticipants(state, payload) {
      const match = state.matches.find((m) => m.id === payload.matchId);

      payload.players.forEach((player) => {
        const index = match.participants.findIndex((p) => p.player.id === player.id);
        match.participants.splice(index, 1);
      });
    },
  },

  actions: {
    fetchMatch({ commit }, matchId) {
      return axios.get(`${url}/v1/matches/${matchId}`).then((response) => {
        const match = response.data;

        match.teeTime = DateTime.fromISO(match.teeTime);

        commit('setMatch', match);
        return match;
      });
    },

    fetchMatches({ commit }, tournamentId) {
      let matchesUrl = `${process.env.VUE_APP_SCORECARD_URL}/v1/`;

      if (tournamentId == null) {
        matchesUrl += 'matches';
      } else {
        matchesUrl += `tournaments/${tournamentId}/matches`;
      }

      return axios.get(matchesUrl).then((response) => {
        commit('setMatches', response.data);
        return response.data;
      });
    },

    saveParticipants({ commit }, payload) {
      const playerIds = { playerIds: payload.players.map((p) => p.id) };

      return axios.post(`${url}/v1/tournaments/${payload.tournamentId}/matches/${payload.matchId}/players`, playerIds).then((response) => {
        commit('addParticipants', payload);
        return response;
      });
    },

    deleteParticipants({ commit }, payload) {
      const requestConfig = { data: { playerIds: payload.players.map((p) => p.id) } };

      return axios.delete(`${url}/v1/tournaments/${payload.tournamentId}/matches/${payload.matchId}/players`, requestConfig).then((response) => {
        commit('removeParticipants', payload);
        return response;
      });
    },
  },
};
