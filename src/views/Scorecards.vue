<template>
  <div>
    <score-bar />
    <div class="p-4">
      <router-link v-for="scorecard in scorecards" :key="scorecard.id" :to="{ name: 'scorecard', params: { id: scorecard.id, hole: 1 }}">
        <div class="border rounded border-grey-300 w-full px-6 py-3 mb-4 shadow">
          <div class="mb-3">
            <div class="font-semibold text-xl">
              Rossmere Golf & Country Club
            </div>
            <div class="text-sm text-grey-600">
              10:43 Saturday, August 15th, 2020
            </div>
          </div>
          <div class="flex items-end justify-between">
            <div class="text-blue-900">
              Fordyce / Milnes
            </div>
            <div class="text-red-900">
              Bale / Ray
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import ScoreBar from '@/components/ScoreBar.vue';

export default {
  components: { ScoreBar },

  data() {
    return {
      scorecards: [{
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      }],
    };
  },
};
</script>
