<template>
  <div>
    <score-slider v-model="strokes" :number="number" :par="par" :player-name="teamName"
                  :current-score="currentScore" :current-par="currentPar" :readonly="readonly"
    />
  </div>
</template>

<script>
import ScoreSlider from '@/components/ScoreSlider';

export default {
  components: { ScoreSlider },

  props: {
    number: {
      type: Number,
      required: true,
    },

    par: {
      type: Number,
      required: true,
    },

    scores: {
      type: Array,
      required: true,
    },

    currentPar: {
      type: Number,
      required: true,
    },

    readonly: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    strokes: {
      get() {
        return this.scores.find((score) => score.holeNumber === this.number).strokes;
      },
      set(value) {
        this.$emit('score-changed', value);
        this.scores.filter((score) => score.holeNumber === this.number).forEach((score) => {
          score.strokes = value;
        });
      },
    },

    currentScore() {
      const { playerId } = this.scores[0];
      let currentStrokes = 0;

      this.scores.forEach((score) => {
        if (score.playerId === playerId && score.holeNumber < this.number) {
          currentStrokes += score.strokes;
        }
      });

      return currentStrokes;
    },

    teamName() {
      const teamScores = this.scores.filter((score) => score.holeNumber === this.number);

      return `${teamScores[0].lastName} / ${teamScores[1].lastName}`;
    },
  },
};
</script>
