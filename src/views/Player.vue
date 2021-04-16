<template>
  <base-page image-url="/img/ocean-hills.webp">
    <template v-slot:header>
      {{ player.firstName }} {{ player.lastName }}
    </template>
    <div class="p-4">
      player details
    </div>
    <router-link v-if="isAdmin" :to="{ name: 'edit-player', params: { playerId: playerId }}">
      <floating-action-button action="edit" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';

export default {
  components: { BasePage, FloatingActionButton },

  props: {
    playerId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters('players', ['getPlayer']),
    ...mapGetters('currentUser', ['isAdmin']),

    player() {
      return this.getPlayer(this.playerId) || {
        firstName: '',
        lastName: '',
      };
    },
  },

  mounted() {
    this.fetchPlayers();
  },

  methods: {
    ...mapActions('players', ['fetchPlayers', 'savePlayer']),
  },
};
</script>
