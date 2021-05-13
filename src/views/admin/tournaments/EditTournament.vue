<template>
  <base-page image-url="/img/oceanside.webp">
    <template v-slot:header>
      <div v-if="tournamentId > 0">
        Edit Tournament
      </div>
      <div v-else>
        Create Tournament
      </div>
    </template>
    <tabs>
      <tab title="Details" class="p-4">
        <base-input v-model="tournament.name" label="Tournament Name" required />
        <div class="grid grid-cols-2 gap-4">
          <div>
            <date-picker v-model="tournament.startDate" label="Start Date" required />
          </div>
          <div>
            <date-picker v-model="tournament.endDate" label="End Date" required />
          </div>
        </div>
        <base-input v-model="tournament.location" label="Tournament Location" />
      </tab>

      <tab title="Players">
        <tournament-players />
      </tab>

      <tab title="Rounds" class="p-4">
        <tournament-rounds />
      </tab>
    </tabs>

    <div class="flex justify-end px-4">
      <router-link :to="getPreviousPage()" class="block">
        <base-button type="secondary" class="mr-2">
          Cancel
        </base-button>
      </router-link>
      <base-button :loading="saving" @click="clickSaveTournament">
        Save
      </base-button>
    </div>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { DateTime } from 'luxon';

import BaseButton from '@/components/buttons/BaseButton';
import BaseInput from '@/components/forms/BaseInput';
import BasePage from '@/components/layout/BasePage';
import DatePicker from '@/components/forms/DatePicker';
import Tab from '@/components/tabs/Tab';
import Tabs from '@/components/tabs/Tabs';

import TournamentPlayers from './tabs/TournamentPlayers';
import TournamentRounds from './tabs/TournamentRounds';

export default {
  components: { BaseButton, BaseInput, BasePage, DatePicker, Tabs, Tab, TournamentPlayers, TournamentRounds },

  props: {
    tournamentId: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      saving: false,
      tournament: {
        name: '',
        startDate: DateTime.local(),
        endDate: DateTime.local(),
        location: '',
      },
    };
  },

  computed: {
    ...mapState('players', ['players']),
    ...mapGetters('tournaments', ['getTournament']),
  },

  mounted() {
    this.fetchTournaments().then(() => {
      this.tournament = {
        ...this.getTournament(this.tournamentId),
      };
    });
  },

  methods: {
    ...mapActions('tournaments', ['fetchTournaments', 'saveTournament']),

    clickSaveTournament() {
      this.saving = true;

      this.saveTournament(this.tournament)
        .then(() => this.$router.push(this.getPreviousPage()))
        .finally(() => { this.saving = false; });
    },

    getPreviousPage() {
      if (this.tournamentId > 0) {
        return { name: 'leaderboard', params: { tournamentId: this.tournamentId } };
      }
      return { name: 'schedule' };
    },
  },
};
</script>
