export default {
  filters: {
    printDate(date) {
      return date.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric' });
    },
  },
};
