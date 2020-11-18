<template>
  <base-page image-url="/img/oceanside.webp">
    <template v-slot:header>
      Tournament Setup
    </template>
    <div class="p-4">
      <tournament-card v-for="tournament in tournaments" :key="tournament.id" v-bind="tournament" />
    </div>
  </base-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import TournamentCard from '@/components/cards/tournament-card';

export default {
  components: { BasePage, TournamentCard },

  data() {
    return {};
  },

  computed: {
    ...mapState('tournaments', ['tournaments']),
  },

  created() {
    this.getTournaments();
  },

  methods: {
    ...mapActions('tournaments', ['getTournaments']),
  },
};
</script>
