<template>
  <div>
    <section-header underline class="my-3">
      Participants
    </section-header>
    <div v-if="players.length == 0">
      <p>There are no players registered for the tour. They must be invited before you can add them to the tournament</p>
      <router-link :to="{ name: 'edit-player', params: { playerId: 0 }}" class="block">
        <base-button class="w-full py-3 mb-4">
          Invite Player
        </base-button>
      </router-link>
    </div>
    <div class="flex">
      <div v-for="player in selectedPlayers" :key="player.id" class="p-2">
        {{ player.firstName }}
      </div>
    </div>
    <ul>
      <li v-for="player in players" :key="player.id">
        <div class="flex items-center p-4 text-xl" @click="toggleSelected(player)">
          <input type="checkbox" class="mr-4" />
          <span>
            {{ player.fullName }}
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import BaseButton from '@/components/buttons/BaseButton';
import SectionHeader from '@/components/typography/SectionHeader';

export default {
  components: { BaseButton, SectionHeader },

  data() {
    return {
      selectedPlayers: [],
    };
  },

  computed: {
    ...mapState({
      players: (state) => state.players.players,
    }),
  },

  mounted() {
    this.fetchPlayers();
  },

  methods: {
    ...mapActions('players', ['fetchPlayers']),

    toggleSelected(player) {
      const index = this.selectedPlayers.findIndex((p) => p.id === player.id);

      if (index < 0) {
        this.selectedPlayers.push(player);
      } else {
        this.selectedPlayers.splice(index, 1);
      }
    },
  },
};
</script>
