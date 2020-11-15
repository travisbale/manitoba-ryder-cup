<template>
  <div>
    <score-bar :tournament-id="tournamentId" />
    <div class="px-2 py-4">
      <scoring-summary match-format="Fourball" class="mb-8" />
      <scoring-summary match-format="Alternate Shot" class="mb-8" />
      <scoring-summary match-format="Scramble" class="mb-8" />
      <scoring-summary match-format="Singles" class="mb-4" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import ScoreBar from '@/components/ScoreBar';
import ScoringSummary from '@/components/ScoringSummary';

export default {
  components: { ScoreBar, ScoringSummary },

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
