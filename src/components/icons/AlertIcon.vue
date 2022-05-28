<template>
  <div>
    <div v-if="variant == 'success'">
      <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <!-- eslint-disable-next-line vue/max-len -->
        <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
      </svg>
    </div>
    <div v-else-if="variant === 'error'">
      <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <!-- eslint-disable-next-line vue/max-len -->
        <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
      </svg>
    </div>
    <div v-else-if="variant === 'info'">
      <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <!-- eslint-disable-next-line vue/max-len -->
        <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
      </svg>
    </div>
    <div v-else-if="variant === 'warning'">
      <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: (variant) => ['info', 'warning', 'error', 'success'].indexOf(variant) !== -1,
    },
  },
};
</script>
