<template>
  <div>
    <score-bar />
    <div class="p-4">
      <div class="mb-4">
        <div class="font-semibold text-2xl">
          {{ teeSet.course }}
        </div>
        <div class="text-grey-600">
          {{ teeSet.yards }} Yards, Par {{ teeSet.par }}
        </div>
      </div>
      <hole-card v-for="hole in teeSet.holes" :key="hole.number" v-bind="hole" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import HoleCard from '@/components/cards/hole-card';
import ScoreBar from '@/components/ScoreBar';

export default {
  components: { HoleCard, ScoreBar },

  props: {
    id: {
      type: Number,
      required: true,
    },

    courseId: {
      type: Number,
      required: true,
    },

    teeColorId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
    };
  },

  computed: {
    ...mapState('teeSet', ['teeSet']),
  },

  mounted() {
    this.getTeeSet({
      courseId: this.courseId,
      teeColorId: this.teeColorId,
    });
  },

  methods: {
    ...mapActions('teeSet', ['getTeeSet']),
  },
};
</script>
