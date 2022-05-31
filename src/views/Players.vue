<template>
  <base-page image-url="/img/mountain-green.webp">
    <template v-slot:header>
      Tournament Players
    </template>
    <tabs>
      <tab title="Current Roster" class="px-4 py-6">
        <p v-if="players.length === 0" class="text-center">
          This year's roster has not been finalized.
        </p>
        <div class="md:grid md:grid-cols-2 gap-4">
          <player-card v-for="player in sortedPlayers" :key="player.id" v-bind="player" class="mb-4" />
        </div>
      </tab>
      <tab title="Past Participants" class="px-4 py-6">
        <p v-if="players.length === 0" class="text-center">
          There are currently no players registered.
        </p>
        <div class="md:grid md:grid-cols-2 gap-4">
          <player-card v-for="player in players" :key="player.id" v-bind="player" class="mb-4" />
        </div>
      </tab>
    </tabs>
    <router-link v-if="hasPermission('create:players')" :to="{ name: 'edit-player', params: { playerId: 0 }}">
      <floating-action-button action="add" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import PlayerCard from '@/components/cards/player-card';
import Tab from '@/components/tabs/Tab';
import Tabs from '@/components/tabs/Tabs';

export default {
  components: { FloatingActionButton, BasePage, PlayerCard, Tab, Tabs },

  computed: {
    ...mapState('players', ['players', 'blueTeam', 'redTeam']),
    ...mapGetters('currentUser', ['hasPermission']),
    ...mapGetters('tournaments', ['currentTournament']),

    sortedPlayers() {
      return [...this.blueTeam, ...this.redTeam].sort((a, b) => this.sortPlayersByTier(a, b));
    },
  },

  mounted() {
    this.fetchPlayers();

    if (this.currentTournament.id === 0) {
      this.fetchTournaments().then(() => {
        this.fetchTournamentPlayers(this.currentTournament.id);
      });
    } else {
      this.fetchTournamentPlayers(this.currentTournament.id);
    }
  },

  methods: {
    ...mapActions('players', ['fetchPlayers', 'fetchTournamentPlayers']),
    ...mapActions('tournaments', ['fetchTournaments']),

    sortPlayersByTier(playerA, playerB) {
      if (playerA.tier === 'gold') return -1;
      if (playerB.tier === 'gold') return 1;
      if (playerA.tier === 'silver') return -1;
      if (playerB.tier === 'silver') return 1;
      if (playerA.tier === 'black') return -1;
      if (playerB.tier === 'black') return 1;
      if (playerA.tier === 'blue') return -1;
      if (playerB.tier === 'blue') return 1;
      if (playerA.tier === 'white') return -1;
      return 1;
    },
  },
};
</script>
