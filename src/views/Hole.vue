<template>
  <div>
    <score-bar />
    <div class="sticky p-4 border-b border-grey-400 bg-white shadow" style="top: 61px">
      <match-summary :id="2" blue-name="Milnes" red-name="Fordyce" score="2 up" class="mb-4" />
      <div class="flex items-center justify-center text-grey-700">
        <div class="flex items-center mr-10">
          <svg class="h-8 w-8 fill-current" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.36,6L12.76,8H18V14H14.64L14.24,12H7V6H12.36M14,4H5V21H7V14H12.6L13,16H20V6H14.4" />
          </svg>
          <div class="text-xl font-semibold">
            {{ number }}
          </div>
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
      <score-slider :par="5" class="mb-12">
        Nigel Milnes
      </score-slider>
    </div>
    <div class="p-4 bg-white">
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
import MatchSummary from '@/components/MatchSummary';
import ScoreBar from '@/components/ScoreBar';
import ScoreSlider from '@/components/ScoreSlider';

export default {
  components: { BaseButton, MatchSummary, ScoreBar, ScoreSlider },

  props: {
    id: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
  },

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
