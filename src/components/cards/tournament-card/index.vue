<template>
  <base-card v-on="$listeners">
    <div class="mb-1 text-2xl font-raleway-semibold text-center">
      {{ location }}
    </div>
    <div class="text-sm text-grey-600 text-center mb-4">
      {{ startDate | printDate }} &ndash; {{ endDate | printDate }}
    </div>
    <div class="flex">
      <div class="w-1/2 pr-4">
        <div class="flex justify-center">
          <div class="flex items-center font-bold leading-none text-blue-800">
            <span class="text-6xl tracking-tighter mr-1">{{ Math.trunc(getTeamScore('Blue')) }}</span>
            <span v-if="getTeamScore('Red') % 1 !== 0" class="text-3xl pt-1">&#189;</span>
          </div>
        </div>
        <div class="text-center">
          Team {{ getTeamName('Blue') }}
        </div>
      </div>
      <div class="w-1/2 pl-4">
        <div class="flex justify-center">
          <div class="flex items-center mr-2 font-bold leading-none text-red-800">
            <span class="text-6xl tracking-tighter mr-1">{{ Math.trunc(getTeamScore('Red')) }}</span>
            <span v-if="getTeamScore('Red') % 1 !== 0" class="text-3xl pt-1">&#189;</span>
          </div>
        </div>
        <div class="text-center">
          Team {{ getTeamName('Red') }}
        </div>
      </div>
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
      type: Array,
      required: true,
    },
  },

  methods: {
    getTeamName(teamColor) {
      const teamName = this.teams.find((t) => t.name === teamColor)?.captain?.lastName;
      return teamName || teamColor;
    },

    getTeamScore(teamColor) {
      return this.teams.find((t) => t.name === teamColor).points;
    },
  },
};
</script>
