<template>
  <div>
    <base-label v-if="label.length > 0">
      {{ label }}
    </base-label>
    <textarea :value="value" class="block mb-6 border border-grey-400 rounded-sm px-3 py-2 w-full shadow-sm"
              :rows="rows" v-on="inputListeners"
    />
  </div>
</template>

<script>
import BaseLabel from '@/components/forms/BaseLabel';

export default {
  components: { BaseLabel },

  props: {
    value: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: '',
    },

    rows: {
      type: Number,
      default: 10,
    },
  },

  computed: {
    inputListeners() {
      return {
        ...this.$listeners,

        input: (event) => this.$emit('input', event.target.value),
      };
    },
  },
};

</script>
