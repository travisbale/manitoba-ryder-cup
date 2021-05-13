<template>
  <div>
    <base-label v-if="label.length > 0">
      {{ label }}
    </base-label>
    <input ref="input" type="file" class="block mb-4" :accept="accept"
           :multiple="multiple" v-on="inputListeners"
    />
  </div>
</template>

<script>
import BaseLabel from '@/components/forms/BaseLabel';

export default {
  components: { BaseLabel },

  props: {
    label: {
      type: String,
      default: '',
    },

    value: {
      type: FileList,
      default: null,
    },

    multiple: {
      type: Boolean,
      default: false,
    },

    accept: {
      type: String,
      default: '',
    },
  },

  computed: {
    inputListeners() {
      return {
        ...this.$listeners,

        input: (event) => {
          this.$emit('input', event.target.files);
        },
      };
    },
  },
};
</script>
