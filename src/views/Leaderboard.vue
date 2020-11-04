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
import ScoreBar from '@/components/ScoreBar.vue';
import ScoringSummary from '@/components/ScoringSummary.vue';

export default {
  components: { ScoreBar, ScoringSummary },

  data() {
    return {};
  },
};
</script>
