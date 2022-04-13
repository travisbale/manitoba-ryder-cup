<template>
  <base-card v-on="$listeners">
    <div class="mb-1">
      {{ location }}
    </div>
    <h2 class="font-raleway-semibold text-xl mb-1">
      {{ `${getTeamName('Blue')} vs ${getTeamName('Red')}` }}
    </h2>
    <div class="text-sm text-grey-600">
      {{ startDate | printDate }} &ndash; {{ endDate | printDate }}
    </div>
  </base-card>
</template>

<script>
import { DateTime } from 'luxon';

import BaseCard from '@/components/cards/base-card';
import datetimeFilters from '@/mixins/filters/datetime';

export default {
  components: { BaseCard },

  mixins: [datetimeFilters],

  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: DateTime,
      required: true,
    },
    endDate: {
      type: DateTime,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    teams: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getTeamName(teamColor) {
      return `Team ${this.teams.find((t) => t.name === teamColor)?.captain?.lastName}`;
    },
  },
};
</script>
