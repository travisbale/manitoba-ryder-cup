<template>
  <base-page back-link-text="Tour Players" :back-link-route="{ name: 'players' }">
    <div class="p-4 border-b border-grey-300 shadow sticky top-0">
      <div class="flex items-center">
        <img class="h-24 w-24 object-cover object-center mr-4 rounded-full border border-grey-200" :src="player.photoPath || '/img/default-avatar.webp'" alt="Avatar" @click="changePhoto()" />
        <div class="mb-1">
          <base-badge :class="badgeColor()">
            {{ player.tier }}
          </base-badge>
          <h1 class="text-3xl font-raleway-semibold">
            {{ player.firstName }} {{ player.lastName }}
          </h1>
          <div class="font-semibold text-grey-600 mr-2">
            {{ record }} &bull; {{ player.cups }} {{ cupText }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 pt-6">
      <section-header>
        Scouting Report
      </section-header>
      <p class="mt-2 whitespace-pre-wrap">
        {{ player.biography || `${player.firstName} ${player.lastName} has no biography.` }}
      </p>
      <div class="flex items-center mt-10">
        <div class="mr-3 font-raleway-semibold text-lg mt-1">
          Pre Ryder Confidence
        </div>
        <div class="flex items-center">
          <star-icon v-for="i in 5" :key="i" :class="i >= 0 ? 'text-cyan-800': 'text-grey-400'" />
        </div>
      </div>
    </div>
    <router-link v-if="isAdmin" :to="{ name: 'edit-player', params: { playerId: playerId }}">
      <floating-action-button action="edit" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BaseBadge from '@/components/BaseBadge';
import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import SectionHeader from '@/components/typography/SectionHeader';
import StarIcon from '@/components/icons/StarIcon';

export default {
  components: { BaseBadge, BasePage, FloatingActionButton, SectionHeader, StarIcon },

  props: {
    playerId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('players', ['getPlayer']),
    ...mapGetters('currentUser', ['isAdmin']),

    player() {
      return this.getPlayer(this.playerId) || {
        firstName: '',
        lastName: '',
        biography: '',
        photoPath: '/img/default-avatar.webp',
      };
    },

    record() {
      return `${this.player.wins}-${this.player.losses}-${this.player.ties}`;
    },

    cupText() {
      return this.cups !== 1 ? 'CUPS' : 'CUP';
    },
  },

  mounted() {
    this.fetchPlayer(this.playerId);
  },

  methods: {
    ...mapActions('players', ['fetchPlayer', 'savePlayer']),

    changePhoto() {
      console.log('click');
    },

    badgeColor() {
      return {
        'bg-white border border-grey-400': this.player.tier === 'white',
        'bg-blue-800 border border-blue-800 text-white': this.player.tier === 'blue',
        'bg-amber-800 border border-amber-800 text-white': this.player.tier === 'gold',
      };
    },
  },
};
</script>
