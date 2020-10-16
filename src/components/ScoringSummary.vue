<template>
  <div class="w-full mb-6">
    <div class="w-full text-center py-4 font-semibold text-xl bg-white">
      Sunday Singles
    </div>
    <match-summary v-for="match in matches" :key="match.id" v-bind="match" />
  </div>
</template>

<script>
import MatchSummary from './MatchSummary.vue';

export default {
  components: { MatchSummary },

  data() {
    return {
      matches: [
        {
          id: 0,
          blueName: 'Milnes',
          redName: 'Fordyce',
          score: '2 up',
        },
        {
          id: 1,
          blueName: 'Milnes',
          redName: 'Fordyce',
          score: 'Halved',
        },
        {
          id: 2,
          blueName: 'Bale',
          redName: 'Ray',
          score: '1 up',
        },
        {
          id: 3,
          blueName: 'Milnes',
          redName: 'Fordyce',
          score: '2 & 1',
        },
        {
          id: 4,
          blueName: 'McInnes',
          redName: 'MacAulay',
          score: 'AS',
        },
      ],
    };
  },
};
</script>
