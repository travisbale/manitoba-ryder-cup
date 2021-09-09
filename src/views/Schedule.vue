<template>
  <base-page image-url="/img/oceanside.webp">
    <template v-slot:header>
      Tournament History
    </template>
    <div class="p-4 pt-6">
      <p v-if="tournaments.length === 0" class="text-center">
        There are currently no tournaments scheduled
      </p>
      <div v-for="season in seasons" v-else :key="season.year">
        <section-header class="mb-4">
          {{ season.year }} Season
        </section-header>
        <router-link v-for="t in season.tournaments" :key="t.id" :to="{ name: 'leaderboard', params: { tournamentId: t.id }}" v-bind="t" class="block">
          <tournament-card v-bind="t" class="mb-4" />
        </router-link>
        <div class="pb-4" />
      </div>
    </div>
    <router-link v-if="hasPermission('create:tournaments')" :to="{ name: 'edit-tournament', params: { tournamentId: 0 }}">
      <floating-action-button action="add" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import SectionHeader from '@/components/typography/SectionHeader';
import TournamentCard from '@/components/cards/tournament-card';

export default {
  components: { FloatingActionButton, BasePage, SectionHeader, TournamentCard },

  computed: {
    ...mapState('tournaments', ['tournaments']),
    ...mapGetters('currentUser', ['hasPermission']),

    year() {
      return DateTime.local().year;
    },

    seasons() {
      const seasons = [];

      this.tournaments.forEach((tournament) => {
        const { year } = tournament.startDate;
        const season = seasons.find((s) => s.year === year);

        if (season != null) {
          // Display tournaments in chronological order within a season
          season.tournaments.push(tournament);
        } else {
          // Display the most recent season first
          seasons.unshift({ year, tournaments: [tournament] });
        }
      });

      return seasons;
    },
  },

  created() {
    this.fetchTournaments();
  },

  methods: {
    ...mapActions('tournaments', ['fetchTournaments']),
  },

};
</script>
