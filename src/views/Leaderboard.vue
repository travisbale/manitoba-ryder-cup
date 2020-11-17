<template>
  <base-page :tournament-id="tournamentId">
    <template v-slot:header>
      Match Results
    </template>
    <div class="px-2 py-4">
      <scoring-summary match-format="Fourball" class="mb-8" />
      <scoring-summary match-format="Alternate Shot" class="mb-8" />
      <scoring-summary match-format="Scramble" class="mb-8" />
      <scoring-summary match-format="Singles" />
    </div>
  </base-page>
</template>

<script>
import { mapActions } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import ScoringSummary from '@/components/ScoringSummary';

export default {
  components: { BasePage, ScoringSummary },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },
  },

  mounted() {
    this.fetchMatches(this.tournamentId);
  },

  methods: {
    ...mapActions('matches', ['fetchMatches']),
  },
};
</script>
