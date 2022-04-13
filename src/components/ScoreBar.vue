<template>
  <router-link :to="{ name: 'leaderboard', params: { tournamentId } }" class="block sticky top-0">
    <div class="relative shadow border-b border-grey-400 bg-white">
      <div class="grid grid-cols-40">
        <div v-for="i in 40" :key="i" class="h-20" :class="getClassesForBar(i)" />
      </div>
      <div class="absolute top-0 left-0 right-0">
        <div class="flex px-2 -mt-0.5">
          <div class="w-1/2 flex items-center">
            <div class="flex items-center h-20 leading-none tracking-tighter font-semibold text-white">
              <span class="text-6xl tracking-tighter mr-1">
                {{ Math.trunc(getScore('Blue')) }}
              </span>
              <span v-if="getScore('Blue') % 1 !== 0" class="text-5xl pt-1">&#189;</span>
            </div>
          </div>
          <div class="w-1/2 flex items-center justify-end">
            <div class="flex items-center leading-tight tracking-tighter font-semibold text-white">
              <span class="text-6xl tracking-tighter mr-1">
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
      const blueScore = this.getScore('Blue') * 2;
      const redScore = this.getScore('Red') * 2;
      const centerBlock = index === 20;
      const lastBlock = index === 40;
      const needsBorder = index % 2 === 0 && !lastBlock;
      const blueBlock = blueScore >= index;
      const lastBlueBlock = blueScore === index;
      const redBlock = redScore >= (41 - index);

      return {
        'border-r': needsBorder,
        'border-grey-900': centerBlock,
        'border-blue-200': needsBorder && blueBlock && !lastBlueBlock,
        'border-red-200': needsBorder && redBlock,
        'border-white': needsBorder && !blueBlock && !centerBlock && !redBlock,

        'bg-blue-800': blueBlock,
        'bg-red-800': redBlock,
        'bg-grey-300': !redBlock && !blueBlock,
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
