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
import ScoringSummary from '@/components/ScoringSummary.vue';
import ScoreBar from '@/components/ScoreBar.vue';

export default {
  components: { ScoreBar, ScoringSummary },

  data() {
    return {};
  },
};
</script>
