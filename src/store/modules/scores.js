import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    scores: [],
  },

  mutations: {
    setScores(state, scores) {
      state.scores = scores;
    },
  },

  actions: {
    fetchScores(context, matchId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/matches/${matchId}/scores`;

      return axios.get(url).then((response) => {
        // commit('setScores', response.data);
        return response.data;
      });
    },
  },
};
