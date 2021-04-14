<template>
  <base-page image-url="/img/ocean-hills.webp">
    <template v-slot:header>
      {{ player.firstName }} {{ player.lastName }}
    </template>
    <div class="p-4">
      player details
    </div>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BasePage from '@/components/layout/BasePage';

export default {
  components: { BasePage },

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
