import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    teeSet: [],
  },

  mutations: {
    setTeeSet(state, teeSet) {
      state.teeSet = teeSet;
    },
  },

  actions: {
    fetchTeeSet({ commit }, payload) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/courses/${payload.courseId}/tees/${payload.teeColorId}`;

      return axios.get(url).then((response) => {
        commit('setTeeSet', response.data);
        return response.data;
      });
    },
  },
};
