<template>
  <router-link :to="{ name: 'leaderboard', params: { tournamentId } }" class="block sticky top-0">
    <div class="relative shadow border-b border-grey-400 bg-white">
      <div class="grid" :class="'grid-cols-' + numBars">
        <div v-for="i in numBars" :key="i" class="h-20" :class="getBlockClasses(i)" />
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

    matches: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapState('tournaments', ['tournaments']),
    ...mapGetters('tournaments', ['getTournament']),

    tournament() {
      return this.getTournament(this.tournamentId);
    },

    projectedBluePoints() {
      return this.getProjectedPoints('Blue');
    },

    projectedRedPoints() {
      return this.getProjectedPoints('Red');
    },

    numBars() {
      return this.matches.length * 2;
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

    getBlockClasses(index) {
      const blueScore = this.getScore('Blue') * 2;
      const projBlueScore = this.projectedBluePoints * 2 + blueScore;
      const redScore = this.getScore('Red') * 2;
      const projRedScore = this.projectedRedPoints * 2 + redScore;
      const blueBlock = index <= blueScore;
      const projBlueBlock = !blueBlock && index <= projBlueScore;
      const greyBlock = !blueBlock && !projBlueBlock && index <= this.numBars - projRedScore;
      const projRedBlock = !blueBlock && !projBlueBlock && !greyBlock && index <= this.numBars - redScore;
      const redBlock = !blueBlock && !projBlueBlock && !greyBlock && !projRedBlock;
      const centerBlock = index === this.matches.length;

      return {
        'bg-blue-800': blueBlock,
        'bg-blue-200': projBlueBlock,
        'bg-grey-300': greyBlock,
        'bg-red-200': projRedBlock,
        'bg-red-800': redBlock,
        'border-r': index % 2 === 0 || centerBlock,
        'border-grey-900': centerBlock,
        'border-white': greyBlock && !centerBlock,
        'border-blue-100': projBlueBlock && !centerBlock,
        'border-blue-300': blueBlock && !centerBlock,
        'border-red-100': projRedBlock && !centerBlock,
        'border-red-300': redBlock && !centerBlock,
      };
    },

    getProjectedPoints(color) {
      let projectedPoints = 0;

      this.matches.forEach((match) => {
        if (match.scores.length > 0 && !match.finished) {
          const { matchStatus } = match.scores[match.scores.length - 1];

          if (matchStatus === 0) {
            projectedPoints += 0.5;
          } else if (color === 'Red' && matchStatus > 0) {
            projectedPoints++;
          } else if (color === 'Blue' && matchStatus < 0) {
            projectedPoints++;
          }
        }
      });

      return projectedPoints;
    },
  },
};
</script>
