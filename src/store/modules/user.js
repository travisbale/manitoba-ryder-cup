import axios from '@/lib/axios';

const anonymousUser = {
  roles: [],
  permissions: [],
};

export default {
  namespaced: true,

  state: {
    user: anonymousUser,
  },

  getters: {
    isLoggedIn(state) {
      return state.user.email != null;
    },

    isAdmin(state) {
      return state.user.roles.includes('Administrator');
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },

  actions: {
    login({ commit }, credentials) {
      return axios.post('login', credentials).then((response) => {
        commit('setUser', response.data);
      });
    },

    refresh({ commit }) {
      const config = { xsrfCookieName: 'csrf_refresh_token' };

      return axios.post('refresh', null, config).then((response) => {
        commit('setUser', response.data);
      });
    },

    logout({ commit }) {
      return axios.delete('logout').then(() => {
        commit('setUser', null);
      });
    },
  },
};
