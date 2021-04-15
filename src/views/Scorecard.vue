<template>
  <base-page image-url="/img/ocean-green.webp">
    <template v-slot:header>
      Scorecard
    </template>
    <score-bar :tournament-id="tournamentId" />
    <div class="p-4 pt-6">
      <section-header class="mb-4">
        {{ teeSet.course }}
        <template v-slot:subheader>
          Par {{ teeSet.par }}, {{ teeSet.yards }} Yards
        </template>
      </section-header>
      <hole-card v-for="hole in teeSet.holes" :key="hole.number" v-bind="hole" :match-id="match.id"
                 :participants="match.participants" :scores="getScores(hole.number)"
      />
    </div>
  </base-page>
</template>

<script>
import BasePage from '@/components/layout/BasePage';
import HoleCard from '@/components/cards/hole-card';
import ScoreBar from '@/components/ScoreBar';
import SectionHeader from '@/components/typography/SectionHeader';
import axios from '@/lib/axios';

export default {
  components: { BasePage, HoleCard, ScoreBar, SectionHeader },

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
    this.fetchMatch(this.matchId);
  },

  methods: {
    fetchMatch(matchId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/matches/${matchId}`;

      return axios.get(url).then((response) => {
        this.match = response.data;
        this.fetchTeeSet(this.match.courseId, this.match.teeColorId);
        this.fetchScores(this.matchId);
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          this.$router.push({ name: 'not-found' });
        }
      });
    },

    fetchTeeSet(courseId, teeColorId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/courses/${courseId}/tees/${teeColorId}`;

      return axios.get(url).then((response) => {
        this.teeSet = response.data;
      });
    },

    fetchScores(matchId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/matches/${matchId}/scores`;

      return axios.get(url).then((response) => {
        this.scores = response.data;
      });
    },

    getScores(holeNumber) {
      return this.scores.filter((score) => score.holeNumber === holeNumber);
    },
  },
};
</script>
