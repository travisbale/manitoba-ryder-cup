<template>
  <div class="flex items-center mb-6">
    <input type="radio" :value="value" :name="name" :checked="checked" class="mr-3 h-6 w-6"
           style="margin-top: 2px; margin-bottom: -2px" v-on="inputListeners"
    />
    <label class="mt-1" @click="$emit('change', value)">
      {{ label }}
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'change',
  },

  props: {
    label: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    modelValue: {
      type: String,
      required: true,
    },

    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    checked() {
      return this.value === this.modelValue;
    },

    inputListeners() {
      return {
        ...this.$listeners,

        change: (event) => this.$emit('change', event.target.value),
      };
    },
  },
};

</script>
