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
    <router-link v-if="isAdmin" :to="{ name: 'edit-player', params: { playerId: 0 }}">
      <floating-action-button action="add" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import PlayerCard from '@/components/cards/player-card';

export default {
  components: { FloatingActionButton, BasePage, PlayerCard },

  computed: {
    ...mapState('players', ['players']),
    ...mapGetters('currentUser', ['isAdmin']),
  },

  mounted() {
    this.fetchPlayers();
  },

  methods: {
    ...mapActions('players', ['fetchPlayers']),
  },
};
</script>
