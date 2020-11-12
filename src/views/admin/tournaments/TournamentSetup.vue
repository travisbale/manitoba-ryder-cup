<template>
  <base-container>
    <page-header>
      Tournaments
    </page-header>
    <tournament-card v-for="tournament in tournaments" :key="tournament.id" v-bind="tournament" />
  </base-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import BaseContainer from '@/components/layout/BaseContainer';
import PageHeader from '@/components/typography/PageHeader';
import TournamentCard from '@/components/cards/tournament-card';

export default {
  components: { BaseContainer, PageHeader, TournamentCard },

  data() {
    return {};
  },

  computed: {
    ...mapState('tournaments', ['tournaments']),
  },

  created() {
    this.getTournaments();
  },

  methods: {
    ...mapActions('tournaments', ['getTournaments']),
  },
};
</script>
