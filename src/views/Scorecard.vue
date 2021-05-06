<template>
  <base-page back-link-text="Manitoba Ryder Cup"
             :back-link-route="{ name: 'leaderboard', params: { tournamentId: tournamentId }}"
             image-url="/img/ocean-green.webp"
  >
    <template v-slot:header>
      {{ match.format }}
    </template>
    <div class="p-4 pt-6">
      <section-header class="mb-4">
        {{ teeSet.course }}
        <template v-slot:subheader>
          Par {{ teeSet.par }}, {{ teeSet.yards }} Yards
        </template>
      </section-header>
      <hole-card v-for="hole in teeSet.holes" :key="hole.number" :number="hole.number" :par="hole.par" :match-id="match.id"
                 :participants="match.participants" v-bind="match.scores[hole.number - 1]"
      />
    </div>
  </base-page>
</template>

<script>
import { mapActions } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import HoleCard from '@/components/cards/hole-card';
import SectionHeader from '@/components/typography/SectionHeader';

export default {
  components: { BasePage, HoleCard, SectionHeader },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },

    matchId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      match: {},
      teeSet: {
        holes: [],
      },
      scores: [],
    };
  },

  mounted() {
    this.fetchMatch(this.matchId).then((match) => {
      this.match = match;
      this.fetchTeeSet({ courseId: this.match.courseId, teeColorId: this.match.teeColorId }).then((teeSet) => {
        this.teeSet = teeSet;
      });
      this.fetchScores(this.matchId).then((scores) => { this.scores = scores; });
    }).catch((error) => {
      if (error.response && error.response.status === 404) {
        this.$router.push({ name: 'not-found' });
      }
    });
  },

  methods: {
    ...mapActions('matches', ['fetchMatch']),
    ...mapActions('teeSets', ['fetchTeeSet']),
    ...mapActions('scores', ['fetchScores']),
  },
};

</script>
