<template>
  <div class="p-4">
    <div class="text-center mb-2">
      <div class="text-xl font-semibold">
        {{ matchFormat }}
      </div>
      <div class="text-grey-600 text-sm">
        {{ matchDate | printDate }}
      </div>
    </div>
    <match-summary v-for="match in getMatches(matchFormat)" :key="match.id" v-bind="match" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import datetimeFilters from '@/mixins/filters/datetime';

import MatchSummary from './MatchSummary';

export default {
  components: { MatchSummary },

  mixins: [datetimeFilters],

  props: {
    matchFormat: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapState('matches', ['matches']),
    ...mapGetters('matches', ['getMatches']),

    matchDate() {
      const matches = this.getMatches(this.matchFormat);

      if (matches.length > 0) {
        return matches[0].teeTime;
      }

      return '';
    },
  },
};
</script>
