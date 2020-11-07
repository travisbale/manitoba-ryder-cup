<template>
  <div>
    <score-bar />
    <div class="p-4 w-full border-b border-grey-400">
      <div class="flex items-center justify-center">
        <div class="mr-10">
          Hole {{ number }}
        </div>
        <div class="mr-10">
          Par {{ par }}
        </div>
        <div class="mr-10">
          {{ yards }} Yards
        </div>
        <div>HDCP {{ hdcp }}</div>
      </div>
    </div>
    <div>
      <score-slider :par="5" class="border-grey-400 mb-8">
        Travis Bale
      </score-slider>
      <score-slider :par="5" class="border-grey-400 mb-8">
        Jon Ray
      </score-slider>
      <score-slider :par="5" class="border-grey-400 mb-8">
        Ian Fordyce
      </score-slider>
      <score-slider :par="5" class="mb-24">
        Nigel Milnes
      </score-slider>
    </div>
    <div class="fixed bottom-0 w-full p-4 bg-white">
      <router-link v-if="number < 18" :to="{ name: 'hole', params: { id, number: parseInt(number) + 1 }}" class="block">
        <base-button class="w-full py-4">
          Next Hole
        </base-button>
      </router-link>
      <base-button v-else :loading="saving" class="w-full py-4" @click="saveRound">
        Save Round
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton';
import ScoreBar from '@/components/ScoreBar';
import ScoreSlider from '@/components/ScoreSlider';

export default {
  components: { BaseButton, ScoreBar, ScoreSlider },

  // eslint-disable-next-line
  props: ['id', 'number'],

  data() {
    return {
      par: 5,
      yards: 512,
      hdcp: 2,
      score: '',
      saving: false,
    };
  },

  methods: {
    saveRound() {
      this.saving = true;

      setTimeout(() => {
        this.saving = false;
        this.$router.push({ name: 'leaderboard' });
      }, 2000);
    },
  },
};
</script>
