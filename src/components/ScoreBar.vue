<template>
  <router-link :to="{ name: 'leaderboard', params: { tournamentId } }" class="block sticky top-0">
    <div class="flex align-center justify-between bg-blue-grey-900">
      <div class="w-1/2 flex items-center px-4 py-2 text-blue-300">
        <div class="mr-4 text-4xl font-semibold">
          {{ getScore('Blue') }}
        </div>
        <div class="text-lg pt-1">
          {{ getCaptain('Blue').lastName }}
        </div>
      </div>
      <div class="w-1/2 flex items-center justify-end px-4 py-2 text-red-300">
        <div class="mr-4 pt-1 text-lg">
          {{ getCaptain('Red').lastName }}
        </div>
        <div class="text-4xl font-semibold">
          {{ getScore('Red') }}
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import axios from '@/lib/axios';

export default {
  props: {
    tournamentId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      teams: [],
    };
  },

  created() {
    this.getTeams(this.tournamentId);
  },

  methods: {
    getTeams() {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/tournaments/${this.tournamentId}/teams`;

      axios.get(url).then((response) => {
        this.teams = response.data;
      });
    },

    getScore(name) {
      const team = this.teams.find((t) => t.name === name);
      return team == null ? 0 : team.points;
    },

    getCaptain(name) {
      const team = this.teams.find((t) => t.name === name);
      return team == null ? {} : team.captain;
    },
  },
};
</script>
