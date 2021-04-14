<template>
  <select class="block mb-4 border border-grey-400 rounded-sm px-3 py-2 w-full shadow-sm bg-white" v-on="$listeners" />
</template>

<script>
export default {
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
