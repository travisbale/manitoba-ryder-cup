<template>
  <router-link :to="{ name: 'leaderboard', params: { tournamentId } }" class="block sticky top-0">
    <div class="shadow border-b border-grey-400 bg-white">
      <div class="flex align-center justify-between px-2 pb-1">
        <div class="w-1/2 flex items-center">
          <div class="flex items-center mr-3 leading-none tracking-tighter font-semibold text-blue-800">
            <span class="text-6xl">
              {{ Math.trunc(getScore('Blue')) }}
            </span>
            <span v-if="getScore('Blue') % 1 !== 0" class="text-5xl pt-1">&#189;</span>
          </div>
          <div class="text-xl pt-2">
            <div class="uppercase text-grey-600 text-sm -mb-1 font-raleway">
              Team
            </div>
            <div>
              {{ getCaptain('Blue').lastName || 'Blue' }}
            </div>
          </div>
        </div>
        <div class="w-1/2 flex items-center justify-end">
          <div class="mr-3 pt-2 text-xl">
            <div class="uppercase text-grey-600 text-sm -mb-1 font-raleway">
              Team
            </div>
            <div>
              {{ getCaptain('Red').lastName || 'Red' }}
            </div>
          </div>
          <div class="flex items-center leading-tight tracking-tighter font-semibold text-red-800">
            <span class="text-6xl">
              {{ Math.trunc(getScore('Red')) }}
            </span>
            <span v-if="getScore('Red') % 1 !== 0" class="text-5xl pt-1">&#189;</span>
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
    ...mapState('teams', ['teams']),
    ...mapGetters('teams', ['getScore', 'getCaptain']),
  },

  created() {
    this.fetchTeams(this.tournamentId);
  },

  methods: {
    ...mapActions('teams', ['fetchTeams']),
  },
};
</script>
