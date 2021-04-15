<template>
  <router-link :to="{ name: 'leaderboard', params: { tournamentId } }" class="block sticky top-0">
    <div class="bg-blue-grey-100">
      <div class="flex align-center justify-between px-2 pb-1">
        <div class="w-1/2 flex items-center text-blue-800">
          <div class="mr-4 text-5xl font-semibold">
            {{ getScore('Blue') }}
          </div>
          <div class="text-xl pt-1">
            {{ getCaptain('Blue').lastName }}
          </div>
        </div>
        <div class="w-1/2 flex items-center justify-end text-red-800">
          <div class="mr-4 pt-1 text-xl">
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
