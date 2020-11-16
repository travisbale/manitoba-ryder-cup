<template>
  <div>
    <section-header class="text-center mb-2">
      {{ matchFormat }}
      <template v-slot:subheader>
        {{ matchDate | printDate }}
      </template>
    </section-header>
    <match-summary v-for="match in getMatches(matchFormat)" :key="match.id" v-bind="match" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

import SectionHeader from '@/components/typography/SectionHeader';
import datetimeFilters from '@/mixins/filters/datetime';

import MatchSummary from './MatchSummary';

export default {
  components: { MatchSummary, SectionHeader },

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
