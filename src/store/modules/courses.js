import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    courses: [],
  },

  mutations: {
    setCourses(state, courses) {
      state.courses = courses;
    },

    saveCourse(state, course) {
      const index = state.courses.findIndex(({ id }) => id === course.id);

      if (index >= 0) state.courses.splice(index, 1, course);
      else state.courses.push(course);
    },
  },

  actions: {
    getCourses({ commit }) {
      return axios.get(`${process.env.VUE_APP_SCORECARD_URL}/v1/courses`).then((response) => {
        commit('setCourses', response.data);
      });
    },

    saveCourse({ commit }, course) {
      let saving;

      if (course.id == null) {
        saving = axios.post('/scorecard/courses/');
      } else {
        saving = axios.put('/scorecard/courses');
      }

      return saving.then((response) => commit('saveCourse', response.data));
    },
  },
};
