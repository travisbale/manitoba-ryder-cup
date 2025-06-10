import axios from '@/lib/axios';

const anonymousUser = {
  roles: [],
  permissions: [],
};

export default {
  namespaced: true,

  state: {
    currentUser: anonymousUser,
  },

  getters: {
    isLoggedIn(state) {
      return state.currentUser.email != null;
    },

    isAdmin(state) {
      return state.currentUser.roles.includes('Administrator');
    },

    hasPermission: (state) => (permission) => {
      return state.currentUser.permissions.find((p) => p === permission) != null;
    },
  },

  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },

  actions: {
    login({ commit }, credentials) {
      return axios.post('login', credentials).then((response) => {
        commit('setCurrentUser', response.data);
      });
    },

    async refresh({ getters, commit }) {
      const config = { xsrfCookieName: 'csrf_refresh_token' };

      if (!getters.isLoggedIn) {
        try {
          const response = await axios.post('refresh', null, config);
          commit('setCurrentUser', response.data);
        } catch {
          commit('setCurrentUser', anonymousUser);
        }
      }
    },

    logout({ commit }) {
      return axios.delete('logout').then(() => {
        commit('setCurrentUser', anonymousUser);
      });
    },

    register({ commit }, credentials) {
      return axios.post('register', credentials).then((response) => {
        commit('setCurrentUser', response.data);
      });
    },

    changePassword({ commit }, credentials) {
      return axios.post('reset-password', credentials).then((response) => {
        commit('setCurrentUser', response.data);
      });
    },
  },
};
