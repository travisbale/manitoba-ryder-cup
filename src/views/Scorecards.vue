<template>
  <base-page image-url="/img/sunset-green.webp">
    <template v-slot:header>
      Scorecards
    </template>
    <div class="p-4 mt-2">
      <p v-if="tournaments.length === 0" class="text-center">
        You have not participated in any matches yet.
      </p>
      <div v-for="tournament in tournaments" :key="tournament.id">
        <section-header class="mb-3">
          {{ tournament.name }}
          <template v-slot:subheader>
            {{ tournament.startDate | printDate }} &ndash; {{ tournament.endDate | printDate }}
          </template>
        </section-header>
        <match-card v-for="match in getMatches(tournament.id)" :key="match.id" v-bind="match" />
      </div>
    </div>
  </base-page>
</template>

<script>
import { DateTime } from 'luxon';
import { mapState } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import MatchCard from '@/components/cards/match-card';
import SectionHeader from '@/components/typography/SectionHeader';
import axios from '@/lib/axios';
// import datetimeFilters from '@/mixins/filters/datetime';

export default {
  components: { BasePage, MatchCard, SectionHeader },

  filters: {
    printDate(date) {
      return date.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric' });
    },
  },

  data() {
    return {
      tournaments: [],
      matches: [],
    };
  },

  computed: {
    ...mapState('currentUser', ['currentUser']),
  },

  mounted() {
    this.fecthTournaments(this.currentUser.id);
    this.fetchMatches(this.currentUser.id);
  },

  methods: {
    fecthTournaments(playerId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/players/${playerId}/tournaments`;

      return axios.get(url).then((response) => {
        this.tournaments = response.data;

        for (let i = 0; i < this.tournaments.length; i++) {
          this.tournaments[i].startDate = DateTime.fromISO(this.tournaments[i].startDate);
          this.tournaments[i].endDate = DateTime.fromISO(this.tournaments[i].endDate);
        }
      });
    },

    fetchMatches(playerId) {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/players/${playerId}/matches`;

      return axios.get(url).then((response) => {
        this.matches = response.data;
      });
    },

    getMatches(tournamentId) {
      return this.matches.filter((match) => match.tournamentId === tournamentId);
    },
  },
};
</script>
