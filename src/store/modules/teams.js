import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    teams: [],
  },

  getters: {
    getScore(state) {
      return (teamName) => {
        const team = state.teams.find((t) => t.name === teamName);
        return team == null ? 0 : team.points;
      };
    },

    getCaptain(state) {
      return (teamName) => {
        const team = state.teams.find((t) => t.name === teamName);
        return team == null ? 0 : team.captain;
      };
    },
  },

  mutations: {
    setTeams(state, teams) {
      state.teams = teams;
    },
  },

  actions: {
    fetchTeams({ state, commit }, tournamentId) {
      if (state.teams.length === 0) {
        const fetching = axios.get(`${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments/${tournamentId}/teams`);

        fetching.then((response) => { commit('setTeams', response.data); });

        return fetching;
      }
      return Promise.resolve({});
    },
  },
};
