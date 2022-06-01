import axios from '@/lib/axios';
import querystring from '@/lib/querystring';

const url = process.env.VUE_APP_SCORECARD_URL;

export default {
  namespaced: true,

  state: {
    players: [],
    blueTeam: [],
    redTeam: [],
  },

  getters: {
    getPlayer: (state) => (id) => {
      return state.players.find((p) => p.id === id);
    },
  },

  mutations: {
    setPlayers(state, players) {
      state.players = players;
    },

    setPlayer(state, player) {
      const index = state.players.findIndex(({ id }) => id === player.id);

      if (index >= 0) state.players.splice(index, 1, player);
      else state.players.push(player);
    },

    setRedTeam(state, players) {
      state.redTeam = players;
    },

    setBlueTeam(state, players) {
      state.blueTeam = players;
    },

    savePlayer(state, player) {
      const index = state.players.findIndex(({ id }) => id === player.id);

      if (index >= 0) state.players.splice(index, 1, player);
      else state.players.push(player);
    },

    addRedTeamMembers(state, players) {
      state.redTeam.push(...players);
    },

    removeRedTeamMembers(state, players) {
      players.forEach((player) => {
        const index = state.redTeam.findIndex((p) => p.id === player.id);
        state.redTeam.splice(index, 1);
      });
    },

    addBlueTeamMembers(state, players) {
      state.blueTeam.push(...players);
    },

    removeBlueTeamMembers(state, players) {
      players.forEach((player) => {
        const index = state.blueTeam.findIndex((p) => p.id === player.id);
        state.blueTeam.splice(index, 1);
      });
    },
  },

  actions: {
    fetchPlayers({ commit }, queryParams) {
      let query = '';

      if (queryParams) {
        query = `?${querystring.encode(queryParams)}`;
      }

      return axios.get(`${process.env.VUE_APP_SCORECARD_URL}/v1/players${query}`).then((response) => {
        commit('setPlayers', response.data);
        return response.data;
      });
    },

    fetchTournamentPlayers({ state, dispatch }, tournamentId) {
      const fetchingBlueTeam = dispatch('fetchTeamMembers', { tournamentId, teamColor: 'Blue ' });
      const fetchingRedTeam = dispatch('fetchTeamMembers', { tournamentId, teamColor: 'Red' });

      return Promise.all([fetchingBlueTeam, fetchingRedTeam]).then(() => {
        return [...state.blueTeam, ...state.redTeam];
      });
    },

    fetchTeamMembers({ commit }, payload) {
      const teamId = payload.teamColor === 'Red' ? 1 : 2;

      return axios.get(`${url}/v1/tournaments/${payload.tournamentId}/teams/${teamId}/players`).then((response) => {
        if (payload.teamColor === 'Red') {
          commit('setRedTeam', response.data);
        } else {
          commit('setBlueTeam', response.data);
        }

        return response.data;
      });
    },

    fetchPlayer({ state, commit }, playerId) {
      const player = state.players.find((p) => p.id === playerId);

      if (player == null) {
        return axios.get(`${process.env.VUE_APP_SCORECARD_URL}/v1/players/${playerId}`).then((response) => {
          commit('setPlayer', response.data);
          // Return a cloned object
          return JSON.parse(JSON.stringify(response.data));
        });
      }
      return Promise.resolve(JSON.parse(JSON.stringify(player)));
    },

    savePlayer({ commit }, player) {
      let saving;
      const saveObject = {
        email: player.email,
        firstName: player.firstName,
        lastName: player.lastName,
        biography: player.biography,
        tier: player.tier,
        hdcp: player.hdcp,
      };

      if (player.id == null) {
        saving = axios.post(`${process.env.VUE_APP_SCORECARD_URL}/v1/players`, saveObject);
      } else {
        saving = axios.put(`${process.env.VUE_APP_SCORECARD_URL}/v1/players/${player.id}`, saveObject);
      }

      return saving.then((response) => {
        commit('savePlayer', response.data);
        return response.data;
      });
    },

    savePlayerPhoto({ commit }, payload) {
      return axios.put(`${process.env.VUE_APP_SCORECARD_URL}/v1/players/${payload.playerId}/photo`, payload.formData)
        .then((response) => {
          commit('savePlayer', response.data);
        });
    },

    saveTeamMembers({ commit }, payload) {
      const teamId = payload.teamColor === 'Red' ? 1 : 2;
      const playerIds = { playerIds: payload.players.map((p) => p.id) };

      return axios.post(`${url}/v1/tournaments/${payload.tournamentId}/teams/${teamId}/players`, playerIds).then((response) => {
        if (payload.teamColor === 'Red') {
          commit('addRedTeamMembers', payload.players);
        } else {
          commit('addBlueTeamMembers', payload.players);
        }

        return response;
      });
    },

    deleteTeamMembers({ commit }, payload) {
      const teamId = payload.teamColor === 'Red' ? 1 : 2;
      const requestConfig = { data: { playerIds: payload.players.map((p) => p.id) } };

      return axios.delete(`${url}/v1/tournaments/${payload.tournamentId}/teams/${teamId}/players`, requestConfig).then((response) => {
        if (payload.teamColor === 'Red') {
          commit('removeRedTeamMembers', payload.players);
        } else {
          commit('removeBlueTeamMembers', payload.players);
        }

        return response;
      });
    },

    sendAccountCreationEmail(context, playerId) {
      return axios.post(`${process.env.VUE_APP_SCORECARD_URL}/v1/players/${playerId}/invitation`);
    },
  },
};
