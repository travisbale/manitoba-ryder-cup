<template>
  <label class="block mb-1" :class="{ 'text-grey-700': valid, 'text-red-800': !valid }">
    <slot />
    <span v-if="required" class="text-red-800">*</span>
  </label>
</template>

<script>
export default {
  name: 'BaseLabel',

  props: {
    required: {
      type: Boolean,
      default: false,
    },

    valid: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
