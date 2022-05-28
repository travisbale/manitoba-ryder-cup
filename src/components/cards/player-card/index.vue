<template>
  <router-link :to="{ name: 'player', params: { playerId: id }}" class="block">
    <base-card class="flex items-center">
      <template v-slot:image>
        <img class="h-32 w-32 object-cover object-top" :src="photoPath || '/img/default-avatar.webp'" :alt="fullName" />
      </template>
      <tier-badge :tier="tier" class="mb-1" />
      <h4 class="text-2xl font-raleway-semibold whitespace-nowrap">
        {{ fullName }}
      </h4>
      <div class="font-semibold text-grey-600 mr-2">
        {{ record }} &bull; {{ cups }} {{ cupText }}
      </div>
    </base-card>
  </router-link>
</template>

<script>
import BaseCard from '@/components/cards/base-card';
import TierBadge from '@/components/badges/TierBadge';
import playerValidation from '@/lib/validators/player';

export default {
  components: { BaseCard, TierBadge },

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
      validator: (tier) => playerValidation.validateTier(tier),
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
  },
};
</script>
