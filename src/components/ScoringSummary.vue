<template>
  <div v-if="matches.length > 0">
    <section-header class="text-center mb-2">
      {{ matchFormat }}
      <template v-slot:subheader>
        {{ matchDate | printDate }}
      </template>
    </section-header>
    <match-overview v-for="match in matches" :key="match.id" v-bind="match" />
  </div>
</template>

<script>
import SectionHeader from '@/components/typography/SectionHeader';
import datetimeFilters from '@/mixins/filters/datetime';

import MatchOverview from './MatchOverview';

export default {
  components: { MatchOverview, SectionHeader },

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
