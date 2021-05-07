<template>
  <div class="flex-shrink-0 w-24 text-center scroll-snap-center" :class="{ 'text-grey-300': !selected }" v-on="$listeners">
    <div class="font-bold text-7xl leading-none min-w-full">
      {{ strokes }}
    </div>
    <div class="whitespace-no-wrap text-lg">
      {{ getScoringTerm() }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    strokes: {
      type: Number,
      required: true,
    },

    par: {
      type: Number,
      required: true,
    },

    selected: {
      type: Boolean,
      required: true,
    },

    observer: {
      type: IntersectionObserver,
      required: true,
    },
  },

  mounted() {
    this.observer.observe(this.$el);
  },

  methods: {
    getScoringTerm() {
      if (this.strokes === 1) {
        return 'Ace';
      }

      switch (this.strokes - this.par) {
        case -3: return 'Albatross';
        case -2: return 'Eagle';
        case -1: return 'Birdie';
        case 0: return 'Par';
        case 1: return 'Bogie';
        default: return `${this.strokes - this.par} Bogie`;
      }
    },
  },
};
</script>
