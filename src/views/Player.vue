<template>
  <base-page back-link-text="Tournament Players" :back-link-route="{ name: 'players' }">
    <div class="p-4 border-b border-grey-300 shadow sticky top-0">
      <div class="flex items-center">
        <img
          class="h-24 w-24 object-cover object-center mr-4 rounded-full border border-grey-200"
          :src="player.photoPath || '/img/default-avatar.webp'" alt="Avatar" @click="changePhoto()"
        />
        <div class="mb-1">
          <tier-badge :tier="player.tier" />
          <h1 class="text-3xl font-raleway-semibold">
            {{ player.firstName }} {{ player.lastName }}
          </h1>
          <div class="text-grey-600 mr-2">
            {{ record }} &bull; {{ player.cups }} {{ cupText }}
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 pt-6">
      <section-header>
        Scouting Report
      </section-header>
      <p class="mt-2 whitespace-pre-line">
        {{ player.biography || `${player.firstName} ${player.lastName} has no biography.` }}
      </p>
    </div>
    <router-link v-if="hasPermission('update:players')" :to="{ name: 'edit-player', params: { playerId: playerId }}">
      <floating-action-button action="edit" />
    </router-link>
  </base-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import BasePage from '@/components/layout/BasePage';
import FloatingActionButton from '@/components/buttons/FloatingActionButton';
import SectionHeader from '@/components/typography/SectionHeader';
import TierBadge from '@/components/badges/TierBadge';

export default {
  components: { TierBadge, BasePage, FloatingActionButton, SectionHeader },

  props: {
    playerId: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapGetters('players', ['getPlayer']),
    ...mapGetters('currentUser', ['hasPermission']),

    player() {
      return this.getPlayer(this.playerId) || {
        firstName: '',
        lastName: '',
        biography: '',
        photoPath: '/img/default-avatar.webp',
        tier: 'white',
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
      // console.log('click');
    },
  },
};
</script>
