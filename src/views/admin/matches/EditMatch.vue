<template>
  <base-page
    back-link-text="Scorecard"
    :back-link-route="{ name: 'scorecard', params: { tournamentId: tournamentId, matchId: matchId }}"
    image-url="/img/fox-harbr.webp"
  >
    <template #header>
      <div v-if="matchId > 0">
        Edit Match
      </div>
      <div v-else>
        Create Match
      </div>
    </template>
    <tabs>
      <tab title="Details" class="px-4 py-6">
        <match-details v-bind="match" />
      </tab>
      <tab title="Blue Team">
        <match-players
          team-color="Blue"
          :tournament-id="tournamentId"
          :match-id="matchId"
          :format="match.format"
          :participating-players="participatingBlueTeamPlayers"
          :available-players="availableBlueTeamPlayers"
        />
      </tab>
      <tab title="Red Team">
        <match-players
          team-color="Red"
          :tournament-id="tournamentId"
          :match-id="matchId"
          :format="match.format"
          :participating-players="participatingRedTeamPlayers"
          :available-players="availableRedTeamPlayers"
        />
      </tab>
    </tabs>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';
import Tab from '@/components/tabs/Tab';
import Tabs from '@/components/tabs/Tabs';

import MatchDetails from './components/MatchDetails';
import MatchPlayers from './components/MatchPlayers';

export default {
  components: { BasePage, Tab, Tabs, MatchDetails, MatchPlayers },

  props: {
    tournamentId: {
      type: Number,
      required: true,
    },

    matchId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      match: {
        id: 0,
        format: '',
        courseId: 0,
        teeColorId: 0,
        teeTime: DateTime.local(),
      },
    };
  },

  computed: {
    ...mapState({
      allBlueTeamPlayers: (state) => state.players.blueTeam,
      allRedTeamPlayers: (state) => state.players.redTeam,
      participants: (state) => state.matches.match.participants,
    }),
    ...mapGetters('matches', ['getMatch']),

    allParticipants() {
      const match = this.getMatch(this.matchId);
      return match != null ? match.participants : [];
    },

    participatingRedTeamPlayers() {
      return this.getTeamPlayers('Red');
    },

    participatingBlueTeamPlayers() {
      return this.getTeamPlayers('Blue');
    },

    availableRedTeamPlayers() {
      return this.getAvailablePlayers(this.allRedTeamPlayers, this.participatingRedTeamPlayers);
    },

    availableBlueTeamPlayers() {
      return this.getAvailablePlayers(this.allBlueTeamPlayers, this.participatingBlueTeamPlayers);
    },
  },

  mounted() {
    this.fetchTeamMembers({ tournamentId: this.tournamentId, teamColor: 'Red' });
    this.fetchTeamMembers({ tournamentId: this.tournamentId, teamColor: 'Blue' });

    if (this.matchId > 0) {
      this.fetchMatch(this.matchId).then((match) => {
        this.match = match;
      });
    }
  },

  methods: {
    ...mapActions('matches', ['fetchMatch']),
    ...mapActions('players', ['fetchTeamMembers']),

    getTeamPlayers(teamColor) {
      return this.allParticipants.filter((p) => p.team === teamColor).map((p) => p.player);
    },

    getAvailablePlayers(allPlayers, participatingPlayers) {
      return allPlayers.filter((player) => {
        const participating = participatingPlayers.find((p) => p.id === player.id);

        return !participating;
      });
    },
  },
};
</script>
