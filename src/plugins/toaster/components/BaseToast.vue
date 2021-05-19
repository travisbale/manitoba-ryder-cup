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
           }"
      >
        <div class="flex items-center justify-center pl-4 pr-3">
          <div v-if="variant == 'success'">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <!-- <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /> -->
              <!-- <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /> -->
              <path fill="currentColor" d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2,4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
            </svg>
          </div>
          <div v-else-if="variant === 'error'">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <!-- <path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />        </svg> -->
              <path fill="currentColor" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
            </svg>
          </div>
          <div v-else-if="variant === 'info'">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <!-- <path fill="currentColor" d="M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z" /> -->
              <path fill="currentColor" d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
            </svg>
          </div>
          <div v-else-if="variant === 'warning'">
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <!-- <path fill="currentColor" d="M10 3H14V14H10V3M10 21V17H14V21H10Z" /> -->
              <path fill="currentColor" d="M12,2L1,21H23M12,6L19.53,19H4.47M11,10V14H13V10M11,16V18H13V16" />
            </svg>
          </div>
        </div>
        <div class="flex-grow">
          <div class="text-sm font-semibold">
            {{ message }}
          </div>
        </div>
        <div v-if="dismissible" class="ml-3 mr-3 cursor-pointer" @click="visible = false">
          <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// eslint-disable-next-line import/extensions
import { EventBus } from '../event-bus.js';

export default {
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
