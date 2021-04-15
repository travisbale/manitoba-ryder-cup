<template>
  <base-page breadcrumb-text="Tournament Schedule" :breadcrumb-route="{ name: 'schedule' }" image-url="/img/fox-harbr.webp">
    <template v-slot:header>
      {{ tournament.name }}
    </template>
    <score-bar :tournament-id="tournamentId" />
    <div class="px-2 pb-4 pt-6">
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
import ScoreBar from '@/components/ScoreBar';
import ScoringSummary from '@/components/ScoringSummary';

export default {
  components: { BasePage, FloatingActionButton, ScoreBar, ScoringSummary },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      tournament: { name: '' },
    };
  },

  computed: {
    ...mapGetters('currentUser', ['isAdmin']),
    ...mapGetters('tournaments', ['getTournament']),
  },

  mounted() {
    this.fetchMatches(this.tournamentId);
    this.fetchTournaments().then(() => {
      this.tournament = {
        ...this.getTournament(this.tournamentId),
      };
    });
  },

  methods: {
    ...mapActions('matches', ['fetchMatches']),
    ...mapActions('tournaments', ['fetchTournaments']),
  },
};
</script>
