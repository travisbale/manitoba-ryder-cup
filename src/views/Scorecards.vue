<template>
  <base-page image-url="/img/sunset-green.webp">
    <template #header>
      My Rounds
    </template>
    <tabs>
      <tab title="Tournaments" class="px-2 pt-6 bg-grey-100">
        <p v-if="tournaments.length === 0" class="text-center">
          You have not participated in any tournaments yet.
        </p>
        <div v-for="tournament in tournaments" :key="tournament.id">
          <section-header class="mb-6 text-center">
            {{ tournament.location }}
            <template #subheader>
              {{ tournament.startDate | printDate }} &ndash; {{ tournament.endDate | printDate }}
            </template>
          </section-header>
          <match-overview v-for="match in getMatches(tournament.id)" :key="match.id" v-bind="match" />
        </div>
      </tab>

      <tab title="Single Matches" class="p-4 pt-6">
        <p class="text-center">
          You have not participated in any single matches yet.
        </p>
      </tab>
    </tabs>
    <div class="p-4 mt-2" />
  </base-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';
import MatchOverview from '@/components/MatchOverview';
import SectionHeader from '@/components/typography/SectionHeader';
import Tab from '@/components/tabs/Tab';
import Tabs from '@/components/tabs/Tabs';
import axios from '@/lib/axios';

export default {
  components: { BasePage, MatchOverview, SectionHeader, Tab, Tabs },

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
    this.fetchPlayers({ email: this.currentUser.email }).then((players) => {
      if (players.length > 0) {
        this.fetchTournaments(players[0].id);
        this.fetchMatches(players[0].id);
      }
    });
  },

  methods: {
    ...mapActions('players', ['fetchPlayers']),

    fetchTournaments(playerId) {
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

        for (let i = 0; i < this.matches.length; i++) {
          this.matches[i].teeTime = DateTime.fromISO(this.matches[i].teeTime);
        }
      });
    },

    getMatches(tournamentId) {
      return this.matches.filter((match) => match.tournamentId === tournamentId);
    },
  },
};
</script>
