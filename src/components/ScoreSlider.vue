<template>
  <div>
    <div class="flex justify-between font-semibold text-2xl px-4 pt-2">
      <div>
        {{ player }}
      </div>
      <div>
        {{ currentScore }}
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

    score: {
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
    currentScore() {
      return this.score + this.value;
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
      this.$refs.slider.scrollLeft = ((window.screen.width * 2) / 5) + (98 * score) - 49 - (window.screen.width / 2);
    },
  },
};
</script>
