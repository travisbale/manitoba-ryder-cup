<template>
  <base-page image-url="/img/oceanside.webp">
    <template v-slot:header>
      Tournament Setup
    </template>
    <div class="p-4">
      <div class="flex justify-between items-end mb-4">
        <base-button class="w-full py-4" @click="openForm({})">
          Create New Tournament
        </base-button>
      </div>
      <tournament-card v-for="t in tournaments" :key="t.id" v-bind="t" @click="openForm(t)" />
    </div>

    <tournament-modal ref="modal" :players="players" @close="closeForm" />
  </base-page>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import BaseButton from '@/components/BaseButton';
import BasePage from '@/components/layout/BasePage';
import TournamentCard from '@/components/cards/tournament-card';
import axios from '@/lib/axios';

import TournamentModal from './TournamentModal';

export default {
  components: { BaseButton, BasePage, TournamentCard, TournamentModal },

  data() {
    return {
      players: [],
    };
  },

  computed: {
    ...mapState('tournaments', ['tournaments']),
  },

  created() {
    this.fetchTournaments();
    this.fetchPlayers();
  },

  methods: {
    ...mapActions('tournaments', ['fetchTournaments']),

    fetchPlayers() {
      const url = `${process.env.VUE_APP_SCORECARD_URL}/v1/players`;

      return axios.get(url).then((response) => {
        this.players = response.data;
      });
    },

    openForm(tournament) {
      this.$refs.modal.open(tournament);
    },

    closeForm() {
      this.$refs.modal.close();
    },
  },
};
</script>
