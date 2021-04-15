<template>
  <div class="flex justify-center items-center h-40 md:h-72 text-center bg-cover bg-bottom"
       :style="`background-image: linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30)), url('${imageUrl}')`"
  >
    <h1 class="font-raleway-bold text-white text-4xl">
      <slot />
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      default: '/img/ocean-flag.webp',
    },
  },
};
</script>
