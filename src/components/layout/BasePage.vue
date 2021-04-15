<template>
  <div class="flex flex-col">
    <site-navigation />
    <div class="lg:container lg:mx-auto">
      <image-header v-if="$slots.header" :image-url="imageUrl">
        <slot name="header" />
      </image-header>
      <slot />
    </div>
  </div>
</template>

<script>
import ImageHeader from '@/components/typography/ImageHeader';
import SiteNavigation from '@/components/site-navigation';

export default {
  components: { ImageHeader, SiteNavigation },

  props: {
    imageUrl: {
      type: String,
      default: '/img/ocean-flag.webp',
    },
  },

};
</script>
