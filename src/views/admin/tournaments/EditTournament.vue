<template>
  <base-page image-url="/img/oceanside.webp">
    <template v-slot:header>
      Edit Tournament
    </template>
    <div class="p-4">
      <tabs>
        <tab title="Details">
          <section-header class="mb-4">
            Tournament Details
          </section-header>
          <base-input v-model="tournament.name" label="Tournament Name" />
          <div class="grid grid-cols-2 gap-4">
            <div>
              <date-picker v-model="tournament.startDate" label="Start Date" />
            </div>
            <div>
              <date-picker v-model="tournament.endDate" label="End Date" />
            </div>
          </div>
        </tab>

        <tab title="Players">
          <tournament-players />
        </tab>

        <tab title="Rounds">
          <tournament-rounds />
        </tab>
      </tabs>

      <div class="flex justify-end mt-6">
        <router-link :to="{ name: 'schedule' }" class="block">
          <base-button type="secondary" class="mr-2">
            Cancel
          </base-button>
        </router-link>
        <base-button :loading="saving" @click="clickSaveTournament">
          Save
        </base-button>
      </div>
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
import SectionHeader from '@/components/typography/SectionHeader';
import Tab from '@/components/tabs/Tab';
import Tabs from '@/components/tabs/Tabs';

import TournamentPlayers from './tabs/TournamentPlayers';
import TournamentRounds from './tabs/TournamentRounds';

export default {
  components: { BaseButton, BaseInput, BasePage, DatePicker, SectionHeader, Tabs, Tab, TournamentPlayers, TournamentRounds },

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
        .then(() => this.$router.push({ name: 'tournament-setup' }))
        .finally(() => { this.saving = false; });
    },
  },
};
</script>
