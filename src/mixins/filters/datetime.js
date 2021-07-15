export default {
  filters: {
    printDate(date) {
      return date.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric' });
    },

    printDateTime(datetime) {
      return datetime.toLocaleString(
        { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' },
      );
    },
  },
};
