<template>
  <div>
    <score-bar :tournament-id="tournamentId" />
    <image-header>Match Results</image-header>
    <div class="px-2 py-6">
      <scoring-summary match-format="Fourball" class="mb-8" />
      <scoring-summary match-format="Alternate Shot" class="mb-8" />
      <scoring-summary match-format="Scramble" class="mb-8" />
      <scoring-summary match-format="Singles" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import ImageHeader from '@/components/typography/ImageHeader';
import ScoreBar from '@/components/ScoreBar';
import ScoringSummary from '@/components/ScoringSummary';

export default {
  components: { ImageHeader, ScoreBar, ScoringSummary },

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
