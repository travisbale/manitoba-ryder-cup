<template>
  <base-badge :class="badgeColor">
    {{ tier }}
  </base-badge>
</template>

<script>
import BaseBadge from '@/components/badges/BaseBadge';
import playerValidation from '@/lib/validators/player';

export default {
  components: { BaseBadge },

  props: {
    tier: {
      type: String,
      required: true,
      validator: (tier) => playerValidation.validateTier(tier),
    },
  },

  computed: {
    badgeColor() {
      return {
        'bg-white border border-grey-400': this.tier === 'white',
        'bg-blue-800 border border-blue-800 text-white': this.tier === 'blue',
        'bg-grey-900 border border-grey-900 text-white': this.tier === 'black',
        'bg-grey-500 border border-grey-500 text-white': this.tier === 'silver',
        'bg-amber-800 border border-amber-800 text-white': this.tier === 'gold',
      };
    },
  },
};
</script>
