<template>
  <input ref="input"
         :type="type"
         class="block mb-3 border border-grey-400 rounded-sm px-3 py-2 w-full shadow-sm"
         :value="value"
         v-on="inputListeners"
  />
</template>

<script>
export default {
  name: 'BaseInput',

  props: {
    type: {
      type: String,
      default: 'text',
    },

    value: {
      type: String,
      required: true,
    },
  },

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
