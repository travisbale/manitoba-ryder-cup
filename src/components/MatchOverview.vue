<template>
  <router-link :to="{ name: 'scorecard', params: { tournamentId: tournamentId, matchId: id }}" class="block">
    <div class="py-4">
      <div class="shadow rounded border border-grey-400 bg-white">
        <div class="flex">
          <team-names :members="blueTeam" team-color="Blue" />
          <div class="flex items-center w-1/5 justify-center text-center">
            <match-details :status-text="getStatusText()" :match-status="currentScore.matchStatus" />
          </div>
          <team-names :members="redTeam" team-color="Red" />
        </div>
        <hr class="border-grey-300" />
        <div class="flex p-4 justify-center">
          <div v-for="hole in holes" :key="hole">
            <div class="flex justify-center items-center h-5 w-5 rounded-full mr-0.5" :class="statusTextColors(hole - 1)">
              <div class="font-bold tracking-tighter text-sm">
                {{ hole }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { DateTime } from 'luxon';
import MatchDetails from '@/components/MatchDetails';
import TeamNames from '@/components/TeamNames';

export default {
  components: { MatchDetails, TeamNames },

  props: {
    id: {
      type: Number,
      required: true,
    },

    tournamentId: {
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

    participants: {
      type: Array,
      required: true,
    },

    scores: {
      type: Array,
      required: true,
    },

    teeTime: {
      type: DateTime,
      required: true,
    },
  },

  data() {
    return {
      holes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    };
  },

  computed: {
    redTeam() {
      return this.participants.filter((p) => p.team === 'Red');
    },

    blueTeam() {
      return this.participants.filter((p) => p.team === 'Blue');
    },

    currentScore() {
      return this.scores[this.scores.length - 1] || {
        matchStatus: 0,
        statusText: 'AS',
      };
    },
  },

  methods: {
    getStatusText() {
      const now = DateTime.now();

      if (now < this.teeTime) {
        return this.teeTime.toLocaleString(DateTime.TIME_24_SIMPLE);
      }

      return this.currentScore.statusText;
    },

    statusTextColors(index) {
      if (this.scores[index] != null) {
        return {
          'text-blue-800': this.scores[index].blueTeamScore > this.scores[index].redTeamScore,
          'text-red-800': this.scores[index].blueTeamScore < this.scores[index].redTeamScore,
          'text-grey-900': this.scores[index].blueTeamScore === this.scores[index].redTeamScore,
          // 'text-white': this.scores[index].blueTeamScore !== this.scores[index].redTeamScore,
        };
      }

      return 'text-grey-300';
    },
  },
};
</script>
