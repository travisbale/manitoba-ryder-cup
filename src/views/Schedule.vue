<template>
  <base-page image-url="/img/oceanside.webp">
    <template v-slot:header>
      Tournament History
    </template>
    <div class="p-4 pt-6 bg-grey-100">
      <p class="text-center text-2xl uppercase font-raleway-bold mb-4">
        An Event Like No Other
      </p>
      <p class="mb-12 text-center">
        The Manitoba Ryder Cup has become one of the province's greatest sporting
        events. Every year, a handful of <span class="line-through">the best</span> players from across the province
        go head to head in match play competition. Drama, tension, incredible golf,
        camaraderie, sportsmanship, and alcohol are served in equal measure, captivating
        an audience of dozens around the world. It's an event that transcends sport,
        yet remains true to the spirit of its founder, Samuel Ryder.
      </p>
      <div class="flex rounded-md overflow-hidden border border-grey-300 shadow w-full bg-white py-4 mb-12">
        <div class="w-1/3 text-center px-4">
          <div class="font-bold text-4xl leading-none mb-2">
            {{ tournaments.length }}
          </div>
          <div class="uppercase text-xs text-grey-600">
            Events
          </div>
        </div>
        <div class="w-1/3 border-l border-r border-grey-400 text-center px-4">
          <div class="font-bold text-4xl leading-none mb-2">
            {{ totalMatches }}
          </div>
          <div class="uppercase text-xs text-grey-600">
            Matches
          </div>
        </div>
        <div class="w-1/3 text-center px-4">
          <div class="font-bold text-4xl leading-none mb-2">
            {{ players.length }}
          </div>
          <div class="uppercase text-xs text-grey-600">
            Players
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="flex items-center justify-center h-12 w-12 rounded-full border border-grey-400">
          <div class="flex items-center justify-center h-8 w-8 rounded-full border border-grey-400">
            <div class="h-4 w-4 rounded-full bg-grey-400" />
          </div>
        </div>
      </div>
      <div class="w-1/2 h-6 border-r border-grey-400 -mt-6" />
      <p v-if="tournaments.length === 0" class="text-center">
        There are currently no tournaments scheduled
      </p>
      <div v-for="season in seasons" v-else :key="season.year">
        <div class="w-1/2 h-8 border-r border-grey-400 mb-2" />
        <div class="mb-2 font-bold text-xl text-center">
          {{ season.year }}
        </div>
        <div v-for="t in season.tournaments" :key="t.id" class="pb-4">
          <div class="w-1/2 h-8 border-r border-grey-400 mb-4" />
          <router-link :to="{ name: 'leaderboard', params: { tournamentId: t.id }}" v-bind="t" class="block">
            <tournament-card v-bind="t" class="mb-2" />
          </router-link>
        </div>
      </div>
    </div>
    <router-link v-if="hasPermission('create:tournaments')" :to="{ name: 'edit-tournament', params: { tournamentId: 0 }}">
      <floating-action-button action="add" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { DateTime } from 'luxon';

import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import TournamentCard from '@/components/cards/tournament-card';

export default {
  components: { FloatingActionButton, BasePage, TournamentCard },

  data() {
    return {
      totalMatches: 0,
    };
  },

  computed: {
    ...mapState('tournaments', ['tournaments']),
    ...mapState('players', ['players']),
    ...mapGetters('currentUser', ['hasPermission']),

    year() {
      return DateTime.local().year;
    },

    seasons() {
      const seasons = [];

      this.tournaments.forEach((tournament) => {
        const { year } = tournament.startDate;
        const season = seasons.find((s) => s.year === year);

        if (season != null) {
          // Display tournaments in chronological order within a season
          season.tournaments.push(tournament);
        } else {
          // Display the most recent season first
          seasons.push({ year, tournaments: [tournament] });
        }
      });

      return seasons;
    },
  },

  created() {
    this.fetchTournaments();
    this.fetchPlayers();
    this.fetchMatchCount().then((response) => { this.totalMatches = response; });
  },

  methods: {
    ...mapActions('tournaments', ['fetchTournaments']),
    ...mapActions('players', ['fetchPlayers']),
    ...mapActions('matches', ['fetchMatchCount']),
  },

};
</script>
