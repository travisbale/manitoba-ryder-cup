<template>
  <base-badge :class="badgeColor">
    {{ tier }}
  </base-badge>
</template>

<script>
import BaseBadge from '@/components/badges/BaseBadge';

export default {
  components: { BaseBadge },

  props: {
    tier: {
      type: String,
      required: true,
    },
  },

  computed: {
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
