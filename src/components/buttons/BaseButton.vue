<template>
  <button type="button"
          class="inline-flex items-center justify-center px-6 py-2
          rounded font-semibold shadow-md"
          :disabled="loading || disabled"
          :class="classes"
          v-on="$listeners"
  >
    <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962
            7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    type: {
      type: String,
      default: 'primary',
      validator(type) {
        return ['primary', 'secondary', 'transparent'].indexOf(type) !== -1;
      },
    },

    loading: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    classes() {
      if (this.disabled) {
        return 'text-grey-500 bg-grey-300';
      }

      return {
        'transparent text-white border-2 border-white': this.type === 'transparent',
        'bg-deep-purple-800 text-white hover:bg-deep-purple-900': this.type === 'primary',
        'bg-grey-400 hover:bg-grey-500': this.type === 'secondary',
      };
    },
  },
};
</script>
