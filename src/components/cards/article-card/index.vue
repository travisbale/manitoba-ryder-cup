<template>
  <base-card v-on="$listeners">
    <template #image>
      <img class="w-full h-56 object-cover object-center" :src="imageUrl" alt="image" />
    </template>
    <h4 class="text-3xl font-raleway-semibold mb-2">
      {{ title }}
    </h4>
    <p class="font-semibold text-sm">
      By {{ author }}
    </p>
    <p class="text-sm text-grey-600">
      {{ printDate(publishedDate) }}
    </p>
  </base-card>
</template>

<script>
import { DateTime } from 'luxon';

import BaseCard from '@/components/cards/base-card';

export default {
  components: { BaseCard },

  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: DateTime,
      required: true,
    },
  },

  methods: {
    printDate(date) {
      return date.toLocaleString(DateTime.DATE_FULL);
    },
  },
};
</script>
