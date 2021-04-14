import axios from '@/lib/axios';

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

    savePlayer(state, player) {
      const index = state.players.findIndex(({ id }) => id === player.id);

      if (index >= 0) state.players.splice(index, 1, player);
      else state.players.push(player);
    },
  },

  actions: {
    fetchPlayers({ state, commit }) {
      if (state.players.length === 0) {
        return axios.get(`${process.env.VUE_APP_SCORECARD_URL}/v1/players`).then((response) => {
          commit('setPlayers', response.data);
        });
      }
      return Promise.resolve({});
    },

    savePlayer({ commit }, player) {
      let saving;

      if (player.id == null) {
        saving = axios.post(`${process.env.VUE_APP_SCORECARD_URL}/v1/players`, player);
      } else {
        saving = axios.put(`${process.env.VUE_APP_SCORECARD_URL}/v1/players/${player.id}`, player);
      }

      return saving.then((response) => commit('savePlayer', response.data));
    },
  },
};
