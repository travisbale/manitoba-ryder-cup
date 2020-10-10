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
      validator: (variant) => ['info', 'warning', 'error', 'success'].indexOf(variant) !== -1,
    },
  },

  data() {
    return {
      alertClasses: {
        'border-blue-500 bg-blue-400': this.variant === 'info',
        'border-yellow-500 bg-yellow-400': this.variant === 'warning',
        'border-red-500 bg-red-400': this.variant === 'error',
        'border-green-500 bg-green-400': this.variant === 'success',
      },
    };
  },
};
</script>
