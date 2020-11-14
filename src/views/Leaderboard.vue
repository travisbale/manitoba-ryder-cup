<template>
  <div>
    <score-bar :tournament-id="tournamentId" />
    <scoring-summary match-format="Fourball" />
    <scoring-summary match-format="Alternate Shot" />
    <scoring-summary match-format="Scramble" />
    <scoring-summary match-format="Singles" />
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
