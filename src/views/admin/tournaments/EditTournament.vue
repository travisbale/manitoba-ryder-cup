<template>
  <base-page
    back-link-text="Leaderboard"
    :back-link-route="{ name: 'leaderboard', params: { tournamentId: tournamentId }}"
    image-url="/img/oceanside.webp"
  >
    <template v-slot:header>
      <div v-if="tournamentId > 0">
        Edit Tournament
      </div>
      <div v-else>
        Create Tournament
      </div>
    </template>
    <tabs>
      <tab title="Details" class="px-4 py-6">
        <tournament-details v-bind="tournament" />
      </tab>
      <tab title="Blue Team">
        <team-members
          team-color="Blue"
          :tournament-id="tournamentId"
          :available-players="availablePlayers"
          :members="blueTeamPlayers"
        />
      </tab>
      <tab title="Red Team">
        <team-members
          team-color="Red"
          :tournament-id="tournamentId"
          :available-players="availablePlayers"
          :members="redTeamPlayers"
        />
      </tab>
    </tabs>
  </base-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';
import Tab from '@/components/tabs/Tab';
import Tabs from '@/components/tabs/Tabs';

import TeamMembers from './components/TeamMembers';
import TournamentDetails from './components/TournamentDetails';

export default {
  components: { BasePage, Tabs, Tab, TournamentDetails, TeamMembers },

  props: {
    tournamentId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      tournament: {
        id: 0,
        name: '',
        startDate: DateTime.local(),
        endDate: DateTime.local(),
        location: '',
      },
    };
  },

  computed: {
    ...mapState({
      allPlayers: (state) => state.players.players,
      blueTeamPlayers: (state) => state.players.blueTeam,
      redTeamPlayers: (state) => state.players.redTeam,
    }),

    availablePlayers() {
      return this.allPlayers.filter((player) => {
        const blueTeamMember = this.blueTeamPlayers.find((p) => p.id === player.id);
        const redTeamMember = this.redTeamPlayers.find((p) => p.id === player.id);

        return !blueTeamMember && !redTeamMember;
      });
    },
  },

  mounted() {
    if (this.tournamentId > 0) {
      this.fetchTournament(this.tournamentId).then((tournament) => {
        this.tournament = tournament;
      });

      this.fetchTeamMembers({ tournamentId: this.tournamentId, teamColor: 'Red' });
      this.fetchTeamMembers({ tournamentId: this.tournamentId, teamColor: 'Blue' });
    }

    this.fetchPlayers();
  },

  methods: {
    ...mapActions('tournaments', ['fetchTournament']),
    ...mapActions('players', ['fetchPlayers', 'fetchTeamMembers']),
  },
};
</script>
