<template>
  <transition name="fade">
    <div v-if="visible" class="flex items-center justify-center fixed left-2 right-2 z-50"
         :class="{
           'opacity-0': !visible,
           'opacity-100': visible,
           'bottom-6': position === 'bottom',
           'top-16': position === 'top',
         }"
    >
      <div class="flex items-center py-3 rounded shadow-lg text-white"
           :class="{
             'bg-green-700': variant === 'success',
             'bg-red-700': variant === 'error',
             'bg-blue-700': variant === 'info',
             'bg-orange-700': variant === 'warning',
             'bg-grey-900 px-4': variant === 'basic',
           }"
      >
        <alert-icon v-if="variant != 'basic'" class="pl-4 pr-3" :variant="variant" />
        <div class="flex-grow text-sm font-semibold">
          {{ message }}
        </div>
        <div v-if="dismissible && variant != 'basic'" class="ml-3 mr-3 cursor-pointer" @click="visible = false">
          <x-icon />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import AlertIcon from '@/components/icons/AlertIcon';
import XIcon from '@/components/icons/XIcon';

import { EventBus } from '../event-bus';

export default {
  components: { AlertIcon, XIcon },

  data() {
    return {
      variant: 'info',
      visible: false,
      message: '',
      duration: 4000,
      dismissible: true,
      position: 'bottom',
    };
  },

  mounted() {
    // Start listening for "toast-message" channel's events
    EventBus.$on('toast-message', this.receiveMessage);
    // this.visible = true;
  },

  methods: {
    receiveMessage(payload) {
      if (payload) {
        this.showMessage(payload.message, payload.variant, payload.options);
      }
    },

    showMessage(message, variant, options) {
      this.variant = variant;
      this.message = message;
      this.visible = true;

      if (options.position) { this.position = options.position; }

      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    },
  },
};
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
