<template>
  <router-link :to="{ name: 'scorecard', params: { tournamentId, matchId: id }}" class="block">
    <base-card class="mb-4">
      Match {{ id }}
    </base-card>
  </router-link>
</template>

<script>
import BaseCard from '@/components/cards/base-card';

export default {
  components: { BaseCard },

  props: {
    id: {
      type: Number,
      required: true,
    },

    tournamentId: {
      type: Number,
      required: true,
    },
  },
};
</script>
