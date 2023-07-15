<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Tab',
    },

    href: {
      type: String,
      default: '#',
    },
  },

  data() {
    return {
      isActive: true,
    };
  },
};
</script>
