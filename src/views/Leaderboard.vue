<template>
  <base-page image-url="/img/crowd.webp">
    <template v-slot:header>
      {{ tournament.name }}
    </template>
    <score-bar :tournament-id="tournamentId" />
    <p v-if="matches.length === 0" class="text-center pt-6">
      There are currently no matches scheduled.
    </p>
    <div class="px-2 pb-4 pt-6">
      <scoring-summary match-format="Fourball" class="mb-8" :matches="getMatches('Fourball')" />
      <scoring-summary match-format="Modified Scotch" class="mb-8" :matches="getMatches('Modified Scotch')" />
      <scoring-summary match-format="Alternate Shot" class="mb-8" :matches="getMatches('Alternate Shot')" />
      <scoring-summary match-format="Singles" :matches="getMatches('Singles')" />
    </div>
    <router-link v-if="hasPermission('update:tournaments')" :to="{ name: 'edit-tournament', params: { tournamentId: tournamentId }}">
      <floating-action-button action="edit" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

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
    ...mapState('matches', ['matches']),
    ...mapGetters('currentUser', ['hasPermission']),
    ...mapGetters('matches', ['getMatches']),
    ...mapGetters('tournaments', ['getTournament']),
  },

  mounted() {
    this.fetchMatches(this.tournamentId);
    this.fetchTournament(this.tournamentId).then((tournament) => {
      this.tournament = tournament;
    });
  },

  methods: {
    ...mapActions('matches', ['fetchMatches']),
    ...mapActions('tournaments', ['fetchTournament']),
  },
};
</script>
