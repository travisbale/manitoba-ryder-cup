<template>
  <div>
    <div v-show="isOpen" class="fixed flex flex-col z-20 inset-0 bg-white shadow-lg">
      <div class="p-4 border-b border-grey-300 shadow">
        <h2 class="font-bold text-3xl">
          <slot name="header" />
        </h2>
      </div>
      <div class="flex-grow p-4 border-b border-grey-300">
        <slot name="body" />
      </div>
      <div class="p-4 border-b border-grey-300 bg-grey-200">
        <slot name="footer" />
      </div>
    </div>
    <div v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-black opacity-50" tabindex="0" @click="close" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    close() {
      console.log('close clicked');
      this.$emit('close');
    },
  },
};
</script>
