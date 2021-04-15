<template>
  <base-card v-on="$listeners">
    This is an article
  </base-card>
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
  },
};
</script>
