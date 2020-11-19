<template>
  <base-page>
    <base-label>Tournament Name</base-label>
    <base-input class="mb-0" :value="name" />

    <div class="grid grid-cols-2 gap-4">
      <div>
        <base-label>Start Date</base-label>
        <date-picker :value="startDate" />
      </div>
      <div>
        <base-label>End Date</base-label>
        <date-picker :value="endDate" />
      </div>
    </div>
  </base-page>
</template>

<script>
import { DateTime } from 'luxon';

import BaseInput from '@/components/forms/BaseInput';
import BaseLabel from '@/components/forms/BaseLabel';
import BasePage from '@/components/layout/BasePage';
import DatePicker from '@/components/forms/DatePicker';

export default {
  components: { BasePage, BaseLabel, BaseInput, DatePicker },

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
  },
};
</script>
