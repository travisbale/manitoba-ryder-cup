<template>
  <div>
    <base-label v-if="label.length > 0" :valid="valid" :required="required">
      {{ label }}
    </base-label>
    <input ref="input"
           :type="type"
           class="block mb-6 border rounded px-3 py-2 w-full shadow-sm"
           :class="{ 'border-grey-400': valid, 'border-red-400': !valid }"
           :value="value"
           :placeholder="placeholder"
           :disabled="disabled"
           v-on="inputListeners"
    />
    <label v-if="!valid" class="block -mt-3.5 mb-4 text-red-800 text-xs">Required</label>
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

    valid: {
      type: Boolean,
      default: true,
    },

    required: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    inputListeners() {
      return {
        ...this.$listeners,

        input: (event) => this.$emit('input', event.target.value),
        change: () => this.validate(),
      };
    },
  },

  methods: {
    validate() {
      this.$emit('update:valid', !this.required || (this.value != null && this.value !== ''));
    },
  },
};
</script>
