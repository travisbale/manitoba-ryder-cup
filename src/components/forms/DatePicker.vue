<template>
  <datepicker v-model="jsDate" input-class="block mb-3 border border-grey-400 rounded-sm px-3 py-2 w-full shadow-sm focus:outline-none" />
</template>

<script>
import { DateTime } from 'luxon';
import Datepicker from 'vuejs-datepicker';

export default {
  components: { Datepicker },

  props: {
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
