<template>
  <router-link :to="{ name: 'player', params: { playerId: id }}" class="block">
    <base-card class="flex items-center">
      <template v-slot:image>
        <img class="h-32 object-cover object-top" :src="photoPath || '/img/default-avatar.webp'" :alt="fullName" />
      </template>
      <base-badge :class="badgeColor">
        {{ tier }}
      </base-badge>
      <h4 class="text-2xl font-semibold whitespace-nowrap">
        {{ fullName }}
      </h4>
      <div class="font-semibold text-grey-600 mr-2">
        {{ record }} &bull; {{ cups }} {{ cupText }}
      </div>
    </base-card>
  </router-link>
</template>

<script>
import BaseBadge from '@/components/BaseBadge';
import BaseCard from '@/components/cards/base-card';

export default {
  components: { BaseCard, BaseBadge },

  props: {
    id: {
      type: Number,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    wins: {
      type: Number,
      required: true,
    },

    losses: {
      type: Number,
      required: true,
    },

    ties: {
      type: Number,
      required: true,
    },

    cups: {
      type: Number,
      required: true,
    },

    photoPath: {
      type: String,
      default: '/img/default-avatar.webp',
    },

    tier: {
      type: String,
      required: true,
      validator: (tier) => ['white', 'blue', 'gold'].indexOf(tier) !== -1,
    },
  },

  data() {
    return {};
  },

  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },

    record() {
      return `${this.wins}-${this.losses}-${this.ties}`;
    },

    cupText() {
      return this.cups !== 1 ? 'CUPS' : 'CUP';
    },

    badgeColor() {
      return {
        'bg-white border border-grey-400': this.tier === 'white',
        'bg-blue-800 border border-blue-800 text-white': this.tier === 'blue',
        'bg-amber-800 border border-amber-800 text-white': this.tier === 'gold',
      };
    },
  },
};
</script>
