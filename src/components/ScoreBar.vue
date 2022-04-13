<template>
  <router-link :to="{ name: 'leaderboard', params: { tournamentId } }" class="block sticky top-0">
    <div class="relative shadow border-b border-grey-400 bg-white">
      <div class="grid grid-cols-20">
        <div v-for="i in 20" :key="i" class="flex h-20" :class="getClassesForBar(i)">
          <div v-if="shouldColorHalfPoint(i, 'Blue')" class="w-1/2 h-20 bg-blue-800" />
          <div v-if="shouldColorHalfPoint(i, 'Red')" class="w-1/2 h-20 bg-grey-300" />
        </div>
      </div>
      <div class="absolute top-0 left-0 right-0">
        <div class="flex px-2 -mt-0.5">
          <div class="w-1/2 flex items-center">
            <div class="flex items-center h-20 leading-none tracking-tighter font-semibold text-white">
              <span class="text-6xl">
                {{ Math.trunc(getScore('Blue')) }}
              </span>
              <span v-if="getScore('Blue') % 1 !== 0" class="text-5xl pt-1">&#189;</span>
            </div>
          </div>
          <div class="w-1/2 flex items-center justify-end">
            <div class="flex items-center leading-tight tracking-tighter font-semibold text-white">
              <span class="text-6xl">
                {{ Math.trunc(getScore('Red')) }}
              </span>
              <span v-if="getScore('Red') % 1 !== 0" class="text-5xl pt-1">&#189;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  props: {
    tournamentId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState('tournaments', ['tournaments']),
    ...mapGetters('tournaments', ['getTournament']),

    tournament() {
      return this.getTournament(this.tournamentId);
    },
  },

  methods: {
    ...mapActions('tournaments', ['fetchTournament']),

    getTeam(teamName) {
      return this.tournament.teams.find((t) => t.name === teamName) || {
        captain: {},
        points: 0,
      };
    },

    getCaptain(teamName) {
      return this.getTeam(teamName).captain || {};
    },

    getScore(teamName) {
      return this.getTeam(teamName).points || 0;
    },

    getClassesForBar(index) {
      const blueScore = this.getScore('Blue');
      const redScore = this.getScore('Red');
      const centerBlock = index === 10;
      const lastBlock = index === 20;
      const blueBlock = blueScore >= index;
      const redBlock = redScore > (20 - index);

      return {
        'border-grey-900': centerBlock,
        'border-white': (!blueBlock || index === blueScore) && !redBlock && !centerBlock && !lastBlock,
        'bg-blue-800': blueBlock,
        'border-blue-400': blueBlock && blueScore > index,
        'bg-red-800': redBlock,
        'border-red-400': redBlock || redScore > (20 - index),
        'bg-grey-300': !blueBlock && !redBlock,
        'border-r': index !== 20,
      };
    },

    shouldColorHalfPoint(index, color) {
      const score = this.getScore(color);

      if (color === 'Blue') {
        return score % 1 !== 0 && Math.ceil(score) === index;
      }

      return score % 1 !== 0 && Math.floor(score) === (20 - index);
    },
  },
};
</script>
