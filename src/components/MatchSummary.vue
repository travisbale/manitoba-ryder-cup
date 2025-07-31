<template>
  <router-link :to="{ name: 'scorecard', params: { tournamentId: tournamentId, matchId: id }}" class="block">
    <div class="flex items-center text-center py-2">
      <div class="w-2/5 p-2 shadow rounded-l border border-r-0 border-grey-300 truncate" :class="blueTeamClasses">
        {{ blueTeam }}
      </div>
      <div class="w-1/5 py-3 text-lg shadow-md rounded border font-semibold uppercase tracking-wide" :class="scoreClasses">
        <match-status :status-text="getStatusText()" />
      </div>
      <div class="w-2/5 p-2 shadow rounded-r border border-l-0 border-grey-300 truncate" :class="redTeamClasses">
        {{ redTeam }}
      </div>
    </div>
  </router-link>
</template>

<script>
import { DateTime } from 'luxon';
import MatchStatus from '@/components/MatchStatus';

export default {
  components: { MatchStatus },

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

  computed: {
    redTeam() {
      return this.getTeamName('Red');
    },

    blueTeam() {
      return this.getTeamName('Blue');
    },

    currentScore() {
      return this.scores[this.scores.length - 1] || {
        matchStatus: 0,
        statusText: 'AS',
      };
    },

    redTeamClasses() {
      return {
        'bg-red-800 font-semibold text-white': this.currentScore.matchStatus > 0,
        'bg-grey-200': this.currentScore.matchStatus <= 0,
      };
    },

    scoreClasses() {
      return {
        'bg-red-50 border-red-100': this.currentScore.matchStatus > 0,
        'bg-blue-50 border-blue-100': this.currentScore.matchStatus < 0,
        'bg-white border-grey-300': this.currentScore.matchStatus === 0,
      };
    },

    blueTeamClasses() {
      return {
        'bg-blue-800 font-semibold text-white': this.currentScore.matchStatus < 0,
        'bg-grey-200': this.currentScore.matchStatus >= 0,
      };
    },
  },

  methods: {
    getTeamName(team) {
      const players = this.participants.filter((p) => p.team === team).map((p) => p.player);

      if (players.length === 1) return players[0].lastName;
      if (players.length === 2) return `${players[0].lastName} / ${players[1].lastName}`;

      return 'TBD';
    },

    getStatusText() {
      return this.currentScore.statusText;
    },
  },
};
</script>
