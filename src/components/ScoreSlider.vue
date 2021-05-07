<template>
  <div>
    <div class="flex justify-between text-2xl px-4 pt-2">
      <div class="font-raleway-semibold">
        {{ player }}
      </div>
      <div>
        {{ newScore }} ({{ scoreUnderPar }})
      </div>
    </div>
    <div ref="slider" class="flex items-center py-4 scroll-snap-x-man"
         :class="{ 'overflow-x-scroll': !readonly, 'overflow-x-hidden': readonly }"
    >
      <div class="flex-shrink-0 w-2/5 scroll-snap-center" />
      <stroke-index v-for="strokes in 20" :key="strokes" :selected="value == strokes"
                    :strokes="strokes" :par="par" :observer="observer" :data-strokes="strokes" @click="selectScore(strokes)"
      />
      <div class="flex-shrink-0 w-2/5 scroll-snap-center" />
    </div>
    <div class="border-t border-grey-300 my-6" />
  </div>
</template>

<script>
import StrokeIndex from '@/components/StrokeIndex';

export default {
  components: { StrokeIndex },

  props: {
    par: {
      type: Number,
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },

    currentPar: {
      type: Number,
      required: true,
    },

    currentScore: {
      type: Number,
      default: 0,
    },

    player: {
      type: String,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },

    readonly: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      observer: null,
      newHole: true,
    };
  },

  computed: {
    newScore() {
      return this.currentScore + this.value;
    },

    scoreUnderPar() {
      const score = this.newScore - this.currentPar;

      if (score > 0) return `+${score}`;
      if (score < 0) return score;
      return 'E';
    },
  },

  watch: {
    number: {
      handler() {
        this.newHole = true;
      },
    },

    value: {
      handler() {
        if (this.newHole) {
          this.update();
        }

        this.newHole = false;
      },
    },

    par: {
      handler() {
        if (this.readonly) {
          this.update();
        }
      },
    },
  },

  created() {
    this.observer = new IntersectionObserver(this.scoreSelected, {
      root: this.$refs.slider,
      rootMargin: '0% -50% -0% -50%',
      threshold: 0,
    });
  },

  mounted() {
    this.update();
  },

  methods: {
    scoreSelected(entries) {
      if (!this.readonly) {
        entries.forEach(({ target, isIntersecting }) => {
          const strokes = parseInt(target.getAttribute('data-strokes'));

          if (isIntersecting && strokes !== this.value) {
            this.$emit('input', strokes);
          }
        });
      }
    },

    selectScore(strokes) {
      if (!this.readonly) {
        this.$emit('input', strokes);
        this.update(strokes);
      }
    },

    update(strokes) {
      const score = strokes || this.value || this.par;

      // Scroll to the selected score
      this.$refs.slider.scrollLeft = ((window.screen.width * 2) / 5) + (84 * score) - 42 - (window.screen.width / 2);
    },
  },
};
</script>
