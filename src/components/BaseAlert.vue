<template>
  <div class="flex items-center py-3 rounded shadow-sm"
       :class="{
         'bg-green-100 text-green-900': variant === 'success',
         'bg-red-100 text-red-900': variant === 'error',
         'bg-blue-100 text-blue-900': variant === 'info',
         'bg-orange-100 text-orange-900': variant === 'warning',
       }"
  >
    <alert-icon :variant="variant" class="pl-4 pr-3" />
    <div class="flex-grow text-sm mt-0.5">
      <slot />
    </div>
  </div>
</template>

<script>
import AlertIcon from '@/components/icons/AlertIcon';

export default {
  components: { AlertIcon },

  props: {
    variant: {
      type: String,
      default: 'info',
      validator: (variant) => ['info', 'warning', 'error', 'success'].indexOf(variant) !== -1,
    },
  },
};
</script>
