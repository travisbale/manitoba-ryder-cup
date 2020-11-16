<template>
  <div class="flex justify-center items-center h-48 text-center bg-cover bg-bottom"
       :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('${imageUrl}')`"
  >
    <h1 class="font-raleway-bold text-white text-4xl mb-3">
      <slot />
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: '/img/ocean-flag.jpg',
    },
  },
};
</script>
