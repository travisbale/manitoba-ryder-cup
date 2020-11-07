<template>
  <div>
    <score-bar />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
    <scoring-summary />
  </div>
</template>

<script>
import ScoreBar from '@/components/ScoreBar';
import ScoringSummary from '@/components/ScoringSummary';

export default {
  components: { ScoreBar, ScoringSummary },

  data() {
    return {};
  },
};
</script>
