<template>
  <div>
    <score-bar />
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

  data() {
    return {
      tournamentId: 3,
    };
  },

  mounted() {
    this.getMatches(this.tournamentId);
  },

  methods: {
    ...mapActions('matches', ['getMatches']),
  },
};
</script>
