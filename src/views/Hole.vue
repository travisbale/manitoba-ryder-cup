<template>
  <base-page back-link-text="Scorecard" :back-link-route="{ name: 'scorecard', params: { touranamentId: tournamentId, matchId: matchId }}">
    <div class="sticky top-0 px-2 py-4 border-b border-grey-400 bg-white shadow">
      <match-summary v-if="match.id != null" v-bind="match" class="mb-4" />
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
          Par {{ hole.par }}
        </div>
        <div class="mr-10">
          {{ hole.yards }} Yards
        </div>
        <div>HDCP {{ hole.hdcp }}</div>
      </div>
    </div>
    <div class="pt-6">
      <score-slider v-for="score in currentScores" :key="score.playerId" v-model="score.strokes"
                    :number="number" :current-score="getCurrentStrokes(score.playerId)" :player="score.playerName"
                    :par="hole.par" :current-par="getCurrentPar()" :readonly="readonly"
      />
    </div>
    <div class="p-4 mb-8 bg-white">
      <base-button :loading="saving" class="w-full py-4" @click="goToNextHole">
        <span v-if="!readonly" class="whitespace-pre">Save & </span>
        <span v-if="number < 18">
          Next Hole
        </span>
        <span v-else>Complete Round</span>
      </base-button>
    </div>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import BaseButton from '@/components/buttons/BaseButton';
import BasePage from '@/components/layout/BasePage';
import MatchSummary from '@/components/MatchSummary';
import ScoreSlider from '@/components/ScoreSlider';
import axios from '@/lib/axios';

export default {
  components: { BasePage, BaseButton, MatchSummary, ScoreSlider },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },

    matchId: {
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
      match: {
        participants: [],
      },
      scores: [],
      saving: false,
    };
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
    ...mapState('teeSets', ['teeSet']),
    ...mapGetters('currentUser', ['isAdmin']),

    readonly() {
      // Admins can edit any match
      if (this.isAdmin) {
        return false;
      }

      // If the current user is participating in the match the page is editable
      for (let i = 0; i < this.match.participants.length; i++) {
        if (this.match.participants[i].email === this.currentUser.email) {
          return false;
        }
      }

      return true;
    },

    hole() {
      if (this.teeSet.holes.length > 0) {
        return this.teeSet.holes[this.number - 1];
      }
      return { par: 0 };
    },

    currentScores() {
      return this.scores.filter((s) => s.holeNumber === this.number);
    },
  },

  watch: {
    matchId(newMatchId) {
      this.fetchHoleDetails(newMatchId);
    },

    number() {
      this.fetchHoleDetails(this.matchId);
    },
  },

  mounted() {
    this.fetchHoleDetails(this.matchId);
  },

  methods: {
    ...mapActions('teeSets', ['fetchTeeSet']),
    ...mapActions('matches', ['fetchMatch']),
    ...mapActions('scores', ['fetchScores']),

    fetchHoleDetails(matchId) {
      this.fetchMatch(matchId).then((match) => {
        this.match = match;
        this.fetchTeeSet({ courseId: this.match.courseId, teeColorId: this.match.teeColorId });
        this.fetchScores(this.matchId, this.number).then((scores) => {
          this.scores = scores;

          this.match.participants.forEach((player) => {
            // Check if each player has already recorded a score on the hole
            if (this.scores.find((score) => score.playerId === player.playerId && score.holeNumber === this.number) == null) {
              // Assign a default score of par or 0 if the hole is readonly
              this.scores.push({
                holeNumber: this.number,
                playerId: player.playerId,
                playerName: player.fullName,
                strokes: this.readonly ? 0 : this.hole.par,
              });
            }
          });
        });
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          this.$router.push({ name: 'not-found' });
        }
      });
    },

    goToNextHole() {
      if (this.readonly) {
        this.pushNextRoute();
      } else {
        this.recordStrokes().then(this.pushNextRoute);
      }
    },

    recordStrokes() {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/matches/${this.matchId}/holes/${this.number}/scores`;
      const scores = this.currentScores.map((score) => ({
        playerId: score.playerId,
        strokes: score.strokes,
      }));

      this.saving = true;

      const recording = axios.post(url, scores);
      recording.finally(() => { this.saving = false; });
      return recording;
    },

    pushNextRoute() {
      if (this.number < 18) {
        this.$router.push({ name: 'hole', params: { matchId: this.matchId, number: this.number + 1 } });
      } else {
        this.$router.push({ name: 'leaderboard', params: { tournamentId: this.tournamentId } });
      }
    },

    getCurrentStrokes(playerId) {
      let currentStrokes = 0;

      this.scores.forEach((score) => {
        if (score.playerId === playerId && score.holeNumber < this.number) {
          currentStrokes += score.strokes;
        }
      });

      return currentStrokes;
    },

    getCurrentPar() {
      let currentPar = 0;

      this.teeSet.holes.forEach((hole) => {
        if (hole.number <= this.number) {
          currentPar += hole.par;
        }
      });

      return currentPar;
    },
  },
};
</script>
