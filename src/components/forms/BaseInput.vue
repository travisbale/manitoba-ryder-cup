<template>
  <div>
    <base-label v-if="label.length > 0">
      {{ label }}
    </base-label>
    <input ref="input"
           :type="type"
           class="block mb-4 border border-grey-400 rounded-sm px-3 py-2 w-full shadow-sm"
           :value="value"
           :placeholder="placeholder"
           v-on="inputListeners"
    />
  </div>
</template>

<script>
import BaseLabel from '@/components/forms/BaseLabel';

export default {
  name: 'BaseInput',

  components: { BaseLabel },

  props: {
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },

    value: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      default: '',
    },
  },

  computed: {
    inputListeners() {
      const vm = this;

      return {
        ...this.$listeners,

        input(event) {
          vm.$emit('input', event.target.value);
        },
      };
    },
  },
};
</script>
