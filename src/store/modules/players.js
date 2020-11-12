import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    players: [],
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
    getPlayers({ commit }) {
      commit('setPlayers', [{
        id: 0,
        pictureUrl: 'img/milnes.png',
        firstName: 'Travis',
        lastName: 'Bale',
        bio: 'stuff',
        wins: 1,
        losses: 1,
        halves: 1,
        cups: 1,
        level: 'white',
        confidence: 4,
      },
      {
        id: 0,
        pictureUrl: 'img/milnes.png',
        firstName: 'Travis',
        lastName: 'Bale',
        bio: 'stuff',
        wins: 1,
        losses: 1,
        halves: 1,
        cups: 1,
        level: 'white',
        confidence: 4,
      },
      {
        id: 0,
        pictureUrl: 'img/milnes.png',
        firstName: 'Travis',
        lastName: 'Bale',
        bio: 'stuff',
        wins: 1,
        losses: 1,
        halves: 1,
        cups: 1,
        level: 'white',
        confidence: 4,
      }]);

      return Promise.resolve();
    },

    savePlayer({ commit }, player) {
      let saving;

      if (player.id == null) {
        saving = axios.post('tournament/players');
      } else {
        saving = axios.put('tournament/players');
      }

      return saving.then((response) => commit('savePlayer', response.data));
    },
  },
};
