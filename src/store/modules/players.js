import axios from '@/lib/axios';
import querystring from '@/lib/querystring';

export default {
  namespaced: true,

  state: {
    players: [],
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

    savePlayer(state, player) {
      const index = state.players.findIndex(({ id }) => id === player.id);

      if (index >= 0) state.players.splice(index, 1, player);
      else state.players.push(player);
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

    sendAccountCreationEmail(context, playerId) {
      return axios.post(`${process.env.VUE_APP_SCORECARD_URL}/v1/players/${playerId}/invitation`);
    },
  },
};
