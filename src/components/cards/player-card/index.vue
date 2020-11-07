<template>
  <router-link :to="{ name: 'player', params: { id }}" class="block">
    <base-card>
      <img class="h-72 w-full object-cover object-top" :src="pictureUrl" :alt="fullName" />
      <div class="p-4">
        <div class="text-grey-600 uppercase font-semibold mt-2">
          {{ record }} &bull; {{ cups }} {{ cupText }}
        </div>
        <div class="flex items-center">
          <h4 class="font-semibold text-2xl mr-2">
            {{ fullName }}
          </h4>
          <base-badge :class="badgeColor">
            {{ level }}
          </base-badge>
        </div>
        <div class="leading-snug mt-2">
          {{ bio }}
        </div>
        <div class="flex items-center mt-4">
          <star-icon v-for="i in 5" :key="i" class="text-orange-800" :class="i <= confidence ? 'text-orange-800': 'text-grey-400'" />
        </div>
      </div>
    </base-card>
  </router-link>
</template>

<script>
import BaseBadge from '@/components/BaseBadge';
import BaseCard from '@/components/cards/base-card';
import StarIcon from '@/components/icons/StarIcon';

export default {
  components: { BaseBadge, BaseCard, StarIcon },

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

    confidence: {
      type: Number,
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

    bio: {
      type: String,
      required: true,
    },

    pictureUrl: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      required: true,
      validator: (level) => ['white', 'blue', 'gold'].indexOf(level) !== -1,
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
      return this.cups > 1 ? 'cups' : 'cup';
    },

    badgeColor() {
      return {
        'bg-white border border-grey-400': this.level === 'white',
        'bg-blue-600 text-white': this.level === 'blue',
        'bg-amber-800 text-white': this.level === 'gold',
      };
    },
  },
};
</script>
