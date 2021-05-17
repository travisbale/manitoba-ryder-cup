<template>
  <transition name="fade">
    <div v-if="visible" class="flex items-center fixed w-4/5 md:w-96 mt-12 mx-auto top-0 right-0 left-0 py-2 bg-white rounded overflow-hidden shadow-lg"
         :class="{
           'border-l-8 border-green-600': variant === 'success',
           'border-l-8 border-red-600': variant === 'danger',
           'border-l-8 border-blue-600': variant === 'info',
           'border-l-8 border-yellow-800': variant === 'warning',
           'opacity-0': !visible,
           'opacity-100': visible,
         }"
    >
      <div class="flex items-center justify-center px-3">
        <div v-if="variant == 'success'" class="rounded-full border-2 text-green-600 border-green-600">
          <svg class="h-4 w-4 fill-current rounded-full" viewBox="0 0 24 24">
            <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
            <!-- <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" /> -->
          </svg>
        </div>
        <div v-else-if="variant === 'danger'" class="rounded-full border-2 text-red-600 border-red-600">
          <svg class="h-4 w-4 fill-current rounded-full" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" />        </svg>
        </div>
        <div v-else-if="variant === 'info'" class="rounded-full border-2 text-blue-600 border-blue-600">
          <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.5,4A1.5,1.5 0 0,0 12,5.5A1.5,1.5 0 0,0 13.5,7A1.5,1.5 0 0,0 15,5.5A1.5,1.5 0 0,0 13.5,4M13.14,8.77C11.95,8.87 8.7,11.46 8.7,11.46C8.5,11.61 8.56,11.6 8.72,11.88C8.88,12.15 8.86,12.17 9.05,12.04C9.25,11.91 9.58,11.7 10.13,11.36C12.25,10 10.47,13.14 9.56,18.43C9.2,21.05 11.56,19.7 12.17,19.3C12.77,18.91 14.38,17.8 14.54,17.69C14.76,17.54 14.6,17.42 14.43,17.17C14.31,17 14.19,17.12 14.19,17.12C13.54,17.55 12.35,18.45 12.19,17.88C12,17.31 13.22,13.4 13.89,10.71C14,10.07 14.3,8.67 13.14,8.77Z" />
          </svg>
        </div>
        <div v-else-if="variant === 'warning'" class="rounded-full border-2 text-orange-600 border-orange-600">
          <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 3H14V14H10V3M10 21V17H14V21H10Z" />
          </svg>
        </div>
      </div>
      <div class="flex-grow">
        <div class="text-sm text-grey-700">
          {{ message }}
        </div>
      </div>
      <div v-if="dissmissable" class="text-grey-600 bg-white my-2 mx-3 cursor-pointer" @click="visible = false">
        <svg class="h-5 w-5 fill-current" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'info',
      validator: (variant) => ['info', 'warning', 'danger', 'success', 'light', 'dark'].indexOf(variant) !== -1,
    },

    dissmissable: {
      type: Boolean,
      default: true,
    },

    duration: {
      type: Number,
      default: 5000,
    },
  },

  data() {
    return {
      visible: false,
      message: '',
    };
  },

  methods: {
    show(message) {
      this.message = message;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    },
  },
};
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
