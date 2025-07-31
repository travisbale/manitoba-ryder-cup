<template>
  <base-page image-url="/img/crowd.webp">
    <template #header>
      <h4 class="font-opensans text-white text-base">
        {{ `${getTeamName('Blue')} vs. ${getTeamName('Red')}` }}
      </h4>
      {{ tournament.startDate.year }} Leaderboard
      <h4 class="font-opensans text-white text-base">
        {{ tournament.location }}
      </h4>
    </template>
    <score-bar :tournament-id="tournamentId" :matches="matches" />
    <p v-if="matches.length === 0" class="text-center pt-6">
      There are currently no matches scheduled.
    </p>
    <tabs>
      <tab title="Fourball" href="#fourball" class="px-2 pt-6">
        <scoring-summary match-format="Fourball" class="mb-12" :matches="getMatches('Fourball')" />
      </tab>
      <tab title="Scotch" href="#scotch" class="px-2 pt-6">
        <scoring-summary match-format="Modified Scotch" class="mb-12" :matches="getMatches('Modified Scotch')" />
      </tab>
      <tab title="Alt Shot" href="#alt-shot" class="px-2 pt-6">
        <scoring-summary match-format="Alternate Shot" class="mb-12" :matches="getMatches('Alternate Shot')" />
      </tab>
      <tab title="Singles" href="#singles" class="px-2 pt-6">
        <scoring-summary match-format="Singles" :matches="getMatches('Singles')" />
      </tab>
    </tabs>
    <scoring-summary match-format="Scramble" class="mb-12" :matches="getMatches('Scramble')" />
    <router-link v-if="hasPermission('update:tournaments')" :to="{ name: 'edit-tournament', params: { tournamentId: tournamentId }}">
      <floating-action-button action="edit" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import ScoreBar from '@/components/ScoreBar';
import ScoringSummary from '@/components/ScoringSummary';
import Tab from '@/components/tabs/Tab';
import Tabs from '@/components/tabs/Tabs';

export default {
  components: { Tabs, Tab, BasePage, FloatingActionButton, ScoreBar, ScoringSummary },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      tournament: {
        name: '',
        startDate: DateTime.now(),
        location: '',
        teams: [],
      },
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

    getTeamName(teamColor) {
      const teamName = this.tournament.teams.find((t) => t.name === teamColor)?.captain?.lastName;
      return `Team ${teamName || teamColor}`;
    },
  },
};
</script>
