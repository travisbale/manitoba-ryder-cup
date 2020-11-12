<template>
  <base-container>
    <page-header>Tournament Form</page-header>

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
  </base-container>
</template>

<script>
import { DateTime } from 'luxon';

import BaseContainer from '@/components/layout/BaseContainer';
import BaseInput from '@/components/forms/BaseInput';
import BaseLabel from '@/components/forms/BaseLabel';
import DatePicker from '@/components/forms/DatePicker';
import PageHeader from '@/components/typography/PageHeader';

export default {
  components: { BaseContainer, BaseLabel, BaseInput, DatePicker, PageHeader },

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
