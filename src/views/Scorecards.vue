<template>
  <div>
    <div class="p-4">
      <page-header>
        Scorecards
      </page-header>
      <router-link v-for="scorecard in scorecards" :key="scorecard.id" :to="{ name: 'scorecard', params: { id: scorecard.id, hole: 1 }}">
        <base-card class="mb-4">
          <template v-slot:content>
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
          </template>
        </base-card>
      </router-link>
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/cards/base-card';
import PageHeader from '@/components/typography/PageHeader';

export default {
  components: { BaseCard, PageHeader },

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
