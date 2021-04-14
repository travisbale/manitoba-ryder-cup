<template>
  <base-page image-url="/img/mountain-green.webp">
    <template v-slot:header>
      Tour Players
    </template>
    <div class="p-4">
      <div class="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <player-card v-for="player in players" :key="player.id" v-bind="player" class="mt-4" />
      </div>
    </div>
  </base-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import PlayerCard from '@/components/cards/player-card';

export default {
  components: { BasePage, PlayerCard },

  computed: {
    ...mapState('players', ['players']),
  },

  mounted() {
    this.fetchPlayers();
  },

  methods: {
    ...mapActions('players', ['fetchPlayers']),
  },
};
</script>
