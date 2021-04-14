<template>
  <base-page image-url="/img/oceanside.webp">
    <template v-slot:header>
      Tournament Schedule
    </template>
    <div class="p-4">
      <section-header class="mb-4">
        <span class="font-raleway">{{ year }}</span> Schedule
      </section-header>
      <router-link v-for="t in tournaments" :key="t.id" :to="{ name: 'leaderboard', params: { tournamentId: t.id }}" v-bind="t" class="block">
        <tournament-card v-bind="t" />
      </router-link>
    </div>
  </base-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';
import SectionHeader from '@/components/typography/SectionHeader';
import TournamentCard from '@/components/cards/tournament-card';

export default {
  components: { BasePage, SectionHeader, TournamentCard },

  computed: {
    ...mapState('tournaments', ['tournaments']),

    year() {
      return DateTime.local().year;
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
