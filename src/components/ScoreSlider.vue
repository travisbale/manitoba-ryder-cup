<template>
  <div class="w-full">
    <div class="font-semibold text-lg px-4 pt-4 mb-1">
      <slot />
    </div>
    <div class="overflow-x-scroll overflow-y-hidden w-full py-3 h-24">
      <div style="width: 1400px">
        <div v-for="i in 20" :key="i" class="inline-block text-center w-20" :class="i !== score ? 'text-grey-300' : ''" @click="setScore(i)">
          <div class="font-bold text-5xl leading-none">
            {{ i }}
          </div>
          <div class="whitespace-no-wrap">
            {{ getScoringTerm(i) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    par: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      score: this.par,
    };
  },

  methods: {
    getScoringTerm(score) {
      if (score === 1) {
        return 'Ace';
      }

      switch (score - this.par) {
        case -3: return 'Albatross';
        case -2: return 'Eagle';
        case -1: return 'Birdie';
        case 0: return 'Par';
        case 1: return 'Bogie';
        default: return `${score - this.par} Bogie`;
      }
    },

    setScore(score) {
      this.score = score;
    },
  },
};
</script>
