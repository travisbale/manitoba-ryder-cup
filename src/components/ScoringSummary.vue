<template>
  <div v-if="matches.length > 0">
    <match-overview v-for="match in matches" :key="match.id" v-bind="match" />
  </div>
</template>

<script>
import datetimeFilters from '@/mixins/filters/datetime';

import MatchOverview from './MatchOverview';

export default {
  components: { MatchOverview },

  mixins: [datetimeFilters],

  props: {
    matchFormat: {
      type: String,
      required: true,
    },

    matches: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
    };
  },

  computed: {
    matchDate() {
      if (this.matches.length > 0) {
        return this.matches[0].teeTime;
      }

      return '';
    },
  },
};
</script>
