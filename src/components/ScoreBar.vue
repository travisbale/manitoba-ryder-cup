<template>
  <router-link :to="{ name: 'leaderboard', params: { tournamentId } }" class="block sticky top-0">
    <div class="bg-blue-grey-900">
      <div class="flex align-center justify-between px-4 pb-1">
        <div class="w-1/2 flex items-center text-blue-300">
          <div class="mr-4 text-5xl font-semibold">
            {{ getScore('Blue') }}
          </div>
          <div class="text-lg pt-1">
            {{ getCaptain('Blue').lastName }}
          </div>
        </div>
        <div class="w-1/2 flex items-center justify-end text-red-300">
          <div class="mr-4 pt-1 text-lg">
            {{ getCaptain('Red').lastName }}
          </div>
          <div class="text-5xl font-semibold">
            {{ getScore('Red') }}
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
