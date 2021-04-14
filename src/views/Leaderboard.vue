<template>
  <base-page :tournament-id="tournamentId" image-url="/img/fox-harbr.webp">
    <template v-slot:header>
      Match Results
    </template>
    <div class="px-2 py-4">
      <scoring-summary match-format="Fourball" class="mb-8" />
      <scoring-summary match-format="Alternate Shot" class="mb-8" />
      <scoring-summary match-format="Scramble" class="mb-8" />
      <scoring-summary match-format="Singles" />
    </div>
    <router-link v-if="isAdmin" :to="{ name: 'edit-tournament', params: { tournamentId: tournamentId }}">
      <floating-action-button action="edit" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import ScoringSummary from '@/components/ScoringSummary';

export default {
  components: { BasePage, FloatingActionButton, ScoringSummary },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('currentUser', ['isAdmin']),
  },

  mounted() {
    this.fetchMatches(this.tournamentId);
  },

  methods: {
    ...mapActions('matches', ['fetchMatches']),
  },
};
</script>
