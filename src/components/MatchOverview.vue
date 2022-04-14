<template>
  <router-link :to="{ name: 'scorecard', params: { tournamentId: tournamentId, matchId: id }}" class="block">
    <div class="mb-6">
      <div class="shadow rounded-md border border-grey-300 bg-white">
        <div class="flex border-b border-grey-300">
          <team-names :members="blueTeam" team-color="Blue" />
          <div class="flex items-center w-1/5 justify-center text-center">
            <match-details :status-text="getStatusText()" :match-status="currentScore.matchStatus" />
          </div>
          <team-names :members="redTeam" team-color="Red" />
        </div>
        <div class="flex p-4 justify-center">
          <div v-for="hole in holes" :key="hole" class="flex justify-center items-center font-semibold tracking-tighter text-sm">
            <div class="h-5 w-5 rounded-full text-center" style="margin: 0 1px;" :class="statusTextColors(hole - 1)">
              {{ hole }}
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

    format: {
      type: String,
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
      return this.getTeamMembers('Red');
    },

    blueTeam() {
      return this.getTeamMembers('Blue');
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
      return this.currentScore.statusText;
    },

    statusTextColors(index) {
      if (this.scores[index] != null) {
        return {
          'bg-red-800': this.scores[index].blueTeamScore > this.scores[index].redTeamScore,
          'bg-blue-800': this.scores[index].blueTeamScore < this.scores[index].redTeamScore,
          'bg-grey-300': this.scores[index].blueTeamScore === this.scores[index].redTeamScore,
          'text-white': this.scores[index].blueTeamScore !== this.scores[index].redTeamScore,
        };
      }

      return 'text-grey-400';
    },

    getTeamMembers(teamColor) {
      if (this.participants.length > 0) {
        return this.participants.filter((p) => p.team === teamColor);
      }

      const participants = [
        { firstName: 'Player', lastName: 'One' },
      ];

      if (this.format !== 'Singles') {
        participants.push({ firstName: 'Player', lastName: 'Two' });
      }

      return participants;
    },
  },
};
</script>
