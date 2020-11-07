<template>
  <router-link :to="{ name: to, params: params }" class="flex items-center px-4 py-2" :class="linkClasses" v-on="$listeners">
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    params: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    linkClasses() {
      return {
        'bg-blue-900 bg-opacity-25': this.$route.name === this.to,
      };
    },
  },
};
</script>
