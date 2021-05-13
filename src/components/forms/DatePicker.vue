<template>
  <div>
    <base-label v-if="label.length > 0">
      {{ label }}
    </base-label>
    <datepicker v-model="jsDate" input-class="block mb-6 border border-grey-400 rounded-sm px-3 py-2 w-full shadow-sm focus:outline-none" />
  </div>
</template>

<script>
import { DateTime } from 'luxon';

import BaseLabel from '@/components/forms/BaseLabel';
import Datepicker from 'vuejs-datepicker';

export default {
  components: { BaseLabel, Datepicker },

  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: DateTime,
      required: true,
    },
  },

  computed: {
    jsDate: {
      get() {
        return this.value.toJSDate();
      },
      set(value) {
        this.$emit('input', DateTime.fromJSDate(value));
      },
    },
  },
};
</script>
