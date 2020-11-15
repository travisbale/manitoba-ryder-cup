<template>
  <div>
    <div class="font-semibold text-xl px-4 pt-2">
      <slot />
    </div>
    <div class="overflow-x-scroll overflow-y-hidden py-4 h-24">
      <div style="width: 1400px">
        <div v-for="strokes in 20" :key="strokes" class="inline-block text-center w-20" :class="strokes !== value ? 'text-grey-300' : ''" v-on="inputListeners(strokes)">
          <div class="font-bold text-5xl leading-none">
            {{ strokes }}
          </div>
          <div class="whitespace-no-wrap">
            {{ getScoringTerm(strokes) }}
          </div>
        </div>
      </div>
    </div>
    <div class="border-t border-grey-300 my-6" />
  </div>
</template>

<script>
export default {
  props: {
    par: {
      type: Number,
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },
  },

  methods: {
    getScoringTerm(strokes) {
      if (strokes === 1) {
        return 'Ace';
      }

      switch (strokes - this.par) {
        case -3: return 'Albatross';
        case -2: return 'Eagle';
        case -1: return 'Birdie';
        case 0: return 'Par';
        case 1: return 'Bogie';
        default: return `${strokes - this.par} Bogie`;
      }
    },

    inputListeners(strokes) {
      const vm = this;

      return {
        ...this.$listeners,

        click() {
          vm.$emit('input', strokes);
        },
      };
    },
  },
};
</script>
