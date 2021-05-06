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
      <score-slider v-for="score in scores" ref="sliders" :key="score.playerId" v-model="score.strokes" :number="number"
                    :score="score.total" :player="score.playerName" :par="hole.par" :readonly="readonly"
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
import { mapGetters, mapState } from 'vuex';

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
      hole: {
        par: 0,
      },
      scores: [],
      saving: false,
    };
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
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
  },

  watch: {
    matchId(newMatchId) {
      this.fetchMatch(newMatchId);
    },

    number() {
      this.fetchMatch(this.matchId);
    },
  },

  mounted() {
    this.fetchMatch(this.matchId);
  },

  methods: {
    fetchMatch(matchId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/matches/${matchId}`;

      return axios.get(url).then((response) => {
        this.match = response.data;
        this.fetchHole(this.match.courseId, this.match.teeColorId, this.number);
        this.fetchScores(this.matchId, this.number);
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          this.$router.push({ name: 'not-found' });
        }
      });
    },

    fetchHole(courseId, teeColorId, number) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/courses/${courseId}/tees/${teeColorId}/holes/${number}`;

      return axios.get(url).then((response) => {
        this.hole = response.data;
      });
    },

    fetchScores(matchId, number) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/matches/${matchId}/holes/${number}/scores`;
      const vm = this;

      return axios.get(url).then((response) => {
        vm.scores = response.data;

        vm.match.participants.forEach((player) => {
          // Check if each player has already recorded a score on the hole
          if (vm.scores.find((score) => score.playerId === player.playerId) == null) {
            // Assign a default score of par or 0 if the hole is readonly
            vm.scores.push({
              playerId: player.playerId,
              playerName: player.fullName,
              strokes: this.readonly ? 0 : this.hole.par,
            });
          }
        });
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          vm.$router.push({ name: 'not-found' });
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
      const scores = this.scores.map((score) => ({
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
  },
};
</script>
