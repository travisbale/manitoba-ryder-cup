import axios from '@/lib/axios';

export default {
  namespaced: true,

  state: {
    courses: [{
      id: 0,
      name: 'Rossmere Golf & Country Club',
      holes: [
        { number: 1, yards: 513, hdcp: 1, par: 5 },
        { number: 2, yards: 338, hdcp: 11, par: 4 },
        { number: 3, yards: 172, hdcp: 15, par: 3 },
        { number: 4, yards: 444, hdcp: 9, par: 4 },
        { number: 5, yards: 156, hdcp: 17, par: 3 },
        { number: 6, yards: 389, hdcp: 13, par: 4 },
        { number: 7, yards: 424, hdcp: 7, par: 4 },
        { number: 8, yards: 514, hdcp: 5, par: 5 },
        { number: 9, yards: 396, hdcp: 3, par: 4 },
        { number: 10, yards: 358, hdcp: 14, par: 4 },
        { number: 11, yards: 460, hdcp: 2, par: 4 },
        { number: 12, yards: 160, hdcp: 18, par: 3 },
        { number: 13, yards: 347, hdcp: 10, par: 4 },
        { number: 14, yards: 215, hdcp: 6, par: 3 },
        { number: 15, yards: 325, hdcp: 4, par: 4 },
        { number: 16, yards: 467, hdcp: 12, par: 5 },
        { number: 17, yards: 154, hdcp: 16, par: 3 },
        { number: 18, yards: 383, hdcp: 8, par: 4 },
      ],
    }],
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
