<template>
  <div class="px-3 py-2 mb-3 border rounded-sm w-full" :class="alertClasses">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseAlert',

  props: {
    variant: {
      type: String,
      default: 'info',
      validator: (variant) => ['info', 'warning', 'danger', 'success', 'light', 'dark'].indexOf(variant) !== -1,
    },
  },

  data() {
    return {
      alertClasses: {
        'border-blue-200 bg-blue-100 text-blue-900': this.variant === 'info',
        'border-yellow-200 bg-yellow-100 text-yellow-900': this.variant === 'warning',
        'border-red-200 bg-red-100 text-red-900': this.variant === 'danger',
        'border-green-200 bg-green-100 text-green-900': this.variant === 'success',
        'border-grey-200 bg-grey-100 text-grey-600': this.variant === 'light',
        'border-grey-500 bg-grey-400 text-grey-900': this.variant === 'dark',
      },
    };
  },
};
</script>
