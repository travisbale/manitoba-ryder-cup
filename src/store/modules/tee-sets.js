import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    teeSet: {
      holes: [],
    },
  },

  mutations: {
    setTeeSet(state, teeSet) {
      state.teeSet = teeSet;
    },
  },

  actions: {
    fetchTeeSet({ state, commit }, payload) {
      if (state.teeSet.courseId !== payload.courseId || state.teeSet.teeColorId !== payload.teeColorId) {
        const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/courses/${payload.courseId}/tees/${payload.teeColorId}`;

        return axios.get(url).then((response) => {
          commit('setTeeSet', response.data);
          return response.data;
        });
      }

      return Promise.resolve(state.teeSet);
    },
  },
};
